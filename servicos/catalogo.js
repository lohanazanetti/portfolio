/* ═══════════════════════════════════════════════════════════════
   catalogo.js — catálogo interativo do mês (Camada 3)
   ═══════════════════════════════════════════════════════════════
   Lê o parâmetro ?c= da URL (mesmo código usado pelo index.html),
   busca o mesmo documento em clientes/{codigo} no Firestore e
   renderiza duas abas independentes: "Farmácia / Vacinas" e
   "Academia". Cada aba tem sua própria seleção de itens, total e
   confirmação, salvos separadamente em clientes/{codigo}/selecoes.

   Lohana: o conteúdo de cada catálogo (vídeos, carrosséis, posts)
   continua vindo do Firestore (data.catalogos.farmaciaVacinas e
   data.catalogos.academia), editável pelo painel admin.html.
   ═══════════════════════════════════════════════════════════════ */

const app = document.getElementById('app');

const params = new URLSearchParams(window.location.search);
const codigo = params.get('c');

const CATEGORIAS = [
    { chave: 'farmaciaVacinas', rotulo: 'Farmácia / Vacinas' },
    { chave: 'academia', rotulo: 'Academia' }
];

/* estado da seleção interativa, um por categoria — as abas são independentes */
const selecoes = {
    farmaciaVacinas: novoEstadoSelecao(),
    academia: novoEstadoSelecao()
};

function novoEstadoSelecao() {
    return {
        videos: new Set(),
        carrosseis: new Set(),
        posts: new Set(),
        storiesFotograficos: false,
        storyArteQtd: 0
    };
}

init();

async function init() {
    if (!codigo) {
        renderNaoEncontrado();
        return;
    }
    try {
        const snap = await db.collection('clientes').doc(codigo).get();
        if (!snap.exists) {
            renderNaoEncontrado();
            return;
        }
        const data = snap.data();
        if (data.tipo === 'redirect' && data.redirectPara) {
            window.location.replace(`${window.location.pathname}?c=${data.redirectPara}`);
        } else if (data.tipo === 'individual') {
            renderCatalogoPagina(codigo, data);
        } else {
            renderNaoEncontrado();
        }
    } catch (err) {
        console.error(err);
        renderErro();
    }
}

/* ═══════════════════ HELPERS ═══════════════════ */

function fmtReal(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getValorItem(valores, nomeItem) {
    const encontrado = (valores || []).find(v => v.item === nomeItem);
    return encontrado ? Number(encontrado.valor) : 0;
}

function catalogoVazio(catalogo) {
    if (!catalogo) return true;
    return !(catalogo.videos || []).length && !(catalogo.carrosseis || []).length && !(catalogo.posts || []).length;
}

/* ═══════════════════ ESTADOS ═══════════════════ */

function renderNaoEncontrado() {
    app.innerHTML = `
        <div class="state-screen">
            <h1 class="page-title">Acesso não encontrado</h1>
            <p class="block-text">Este link não corresponde a nenhum acesso ativo. Verifique se o endereço está completo ou entre em contato para receber um novo link.</p>
        </div>
    `;
}

function renderErro() {
    app.innerHTML = `
        <div class="state-screen">
            <h1 class="page-title">Não foi possível carregar</h1>
            <p class="block-text">Tente novamente em instantes.</p>
        </div>
    `;
}

/* ═══════════════════ PÁGINA DO CATÁLOGO ═══════════════════ */

function renderCatalogoPagina(codigo, data) {
    const valores = data.valores || [];
    const catalogos = data.catalogos || {};
    const simulacoes = data.simulacoes || [];

    const primeiraComItens = CATEGORIAS.find(cat => !catalogoVazio(catalogos[cat.chave]));
    const categoriaAtiva = (primeiraComItens || CATEGORIAS[0]).chave;

    const tabsHTML = CATEGORIAS.map(cat => {
        const vazio = catalogoVazio(catalogos[cat.chave]);
        const ativa = cat.chave === categoriaAtiva;
        const nota = vazio ? '<span class="tab-btn-nota">em breve</span>' : '';
        return `<button type="button" class="tab-btn${ativa ? ' active' : ''}" data-tab="${cat.chave}" ${vazio ? 'disabled' : ''}>${cat.rotulo}${nota}</button>`;
    }).join('');

    const panelsHTML = CATEGORIAS.map(cat => painelHTML(cat, catalogos[cat.chave] || {}, valores, simulacoes, cat.chave === categoriaAtiva)).join('');

    app.innerHTML = `
        <div class="page-hero reveal">
            <p class="page-eyebrow">Creator Mobile · ${data.nome || ''}</p>
            <h1 class="page-title">Catálogo do mês</h1>
        </div>

        <section class="block reveal">
            <div class="tabs">${tabsHTML}</div>
        </section>

        ${panelsHTML}

        <div class="content-spacer"></div>
        <div class="content-spacer"></div>
    `;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            const cat = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.dataset.painel === cat));
        });
    });

    CATEGORIAS.forEach(cat => {
        const catalogo = catalogos[cat.chave] || {};
        if (!catalogoVazio(catalogo)) {
            renderCatalogoInterativo(codigo, cat.chave, valores, catalogo);
        }
    });

    observeReveal();
}

function painelHTML(cat, catalogo, valores, simulacoes, ativo) {
    if (catalogoVazio(catalogo)) {
        return `
            <div class="tab-panel${ativo ? ' active' : ''}" data-painel="${cat.chave}">
                <section class="block reveal">
                    <p class="block-text">O catálogo de ${cat.rotulo} ainda não está disponível este mês. Em breve.</p>
                </section>
            </div>
        `;
    }
    return `
        <div class="tab-panel${ativo ? ' active' : ''}" data-painel="${cat.chave}">
            <section class="block reveal" id="catalogo-secao-${cat.chave}">
                <h2 class="block-title">Catálogo do mês${catalogo.mes ? ' — ' + catalogo.mes : ''}</h2>
                <p class="block-text" style="margin-bottom:20px;">
                    Marque os itens que fazem sentido para este mês. O valor total é somado
                    automaticamente e fica visível na barra abaixo.
                </p>
                <div id="catalogo-interativo-${cat.chave}"></div>
            </section>

            ${simulacoesHTML(simulacoes)}

            <div class="total-bar" id="total-bar-${cat.chave}">
                <div>
                    <div class="total-bar-label">Total selecionado</div>
                    <div class="total-bar-value" id="total-valor-${cat.chave}">R$ 0,00</div>
                </div>
                <button class="btn-primary" id="btn-confirmar-${cat.chave}">Confirmar seleção</button>
            </div>
        </div>
    `;
}

function simulacoesHTML(simulacoes) {
    if (!simulacoes || !simulacoes.length) return '';
    const linhas = simulacoes.map((s, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${s.composicao}</td>
            <td>${fmtReal(Number(s.valor))}</td>
        </tr>
    `).join('');
    return `
        <section class="block reveal">
            <h2 class="block-title">Simulações ilustrativas</h2>
            <p class="block-text" style="margin-bottom:14px;">
                Não existem pacotes fechados nem opções fixas para escolher. As simulações
                abaixo são apenas exemplos de como a soma dos itens pode variar mês a mês.
            </p>
            <table class="sim-table">
                <thead><tr><th>#</th><th>Composição</th><th>Valor</th></tr></thead>
                <tbody>${linhas}</tbody>
            </table>
        </section>
    `;
}

/* ═══════════════════ CATÁLOGO INTERATIVO (por categoria) ═══════════════════ */

function renderCatalogoInterativo(codigo, categoria, valores, catalogo) {
    const precoReel = getValorItem(valores, 'Reel');
    const precoCarrossel = getValorItem(valores, 'Carrossel');
    const precoPost = getValorItem(valores, 'Post estático');
    const precoStoriesFoto = getValorItem(valores, 'Stories Fotográficos');
    const precoStoryArte = getValorItem(valores, 'Story Arte');

    const videos = catalogo.videos || [];
    const carrosseis = catalogo.carrosseis || [];
    const posts = catalogo.posts || [];

    const notas = catalogo.notas || {};

    const grupo = (titulo, itens, grupoCat, preco) => {
        if (!itens.length) return '';
        const itensHTML = itens.map((it, i) => `
            <label class="catalogo-item" data-cat="${grupoCat}" data-idx="${i}">
                <input type="checkbox">
                <div class="catalogo-item-body">
                    <div class="catalogo-item-title">${it.titulo}</div>
                    <div class="catalogo-item-desc">${it.roteiro || it.descricao || ''}</div>
                </div>
                <div class="catalogo-item-price">${fmtReal(preco)}</div>
            </label>
        `).join('');
        const notaHTML = notas[grupoCat] ? `<div class="catalogo-nota">${notas[grupoCat]}</div>` : '';
        return `
            <div class="catalogo-group">
                <div class="catalogo-group-title">${titulo}</div>
                ${itensHTML}
                ${notaHTML}
            </div>
        `;
    };

    const container = document.getElementById(`catalogo-interativo-${categoria}`);
    container.innerHTML = `
        <div class="catalogo-group">
            <div class="catalogo-group-title">Itens fixos do mês</div>
            <label class="catalogo-fixed">
                <input type="checkbox" id="chk-stories-foto-${categoria}">
                <div class="catalogo-fixed-body">
                    <div class="catalogo-item-title">Stories Fotográficos</div>
                    <div class="catalogo-item-desc">Sessão mensal de produção + programação semanal de stories.</div>
                </div>
                <div class="catalogo-item-price">${fmtReal(precoStoriesFoto)} /mês</div>
            </label>
            <div class="catalogo-fixed">
                <div class="catalogo-fixed-body">
                    <div class="catalogo-item-title">Story Arte avulso</div>
                    <div class="catalogo-item-desc">${fmtReal(precoStoryArte)} por unidade.</div>
                </div>
                <div class="qty-control">
                    <button type="button" class="qty-btn" id="qty-menos-${categoria}">–</button>
                    <span class="qty-value" id="qty-valor-${categoria}">0</span>
                    <button type="button" class="qty-btn" id="qty-mais-${categoria}">+</button>
                </div>
            </div>
        </div>
        ${grupo('Vídeos', videos, 'videos', precoReel)}
        ${grupo('Carrosséis', carrosseis, 'carrosseis', precoCarrossel)}
        ${grupo('Posts estáticos', posts, 'posts', precoPost)}
    `;

    const precos = { videos: precoReel, carrosseis: precoCarrossel, posts: precoPost };
    const selecao = selecoes[categoria];

    container.querySelectorAll('.catalogo-item').forEach(el => {
        const checkbox = el.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            const cat = el.dataset.cat;
            const idx = el.dataset.idx;
            const chave = `${cat}-${idx}`;
            if (checkbox.checked) {
                selecao[cat].add(chave);
                el.classList.add('selected');
            } else {
                selecao[cat].delete(chave);
                el.classList.remove('selected');
            }
            atualizarTotal(categoria, precos, precoStoriesFoto, precoStoryArte);
        });
    });

    const chkStoriesFoto = document.getElementById(`chk-stories-foto-${categoria}`);
    chkStoriesFoto.addEventListener('change', () => {
        selecao.storiesFotograficos = chkStoriesFoto.checked;
        atualizarTotal(categoria, precos, precoStoriesFoto, precoStoryArte);
    });

    const qtyValor = document.getElementById(`qty-valor-${categoria}`);
    document.getElementById(`qty-mais-${categoria}`).addEventListener('click', () => {
        selecao.storyArteQtd++;
        qtyValor.textContent = selecao.storyArteQtd;
        atualizarTotal(categoria, precos, precoStoriesFoto, precoStoryArte);
    });
    document.getElementById(`qty-menos-${categoria}`).addEventListener('click', () => {
        if (selecao.storyArteQtd > 0) selecao.storyArteQtd--;
        qtyValor.textContent = selecao.storyArteQtd;
        atualizarTotal(categoria, precos, precoStoriesFoto, precoStoryArte);
    });

    document.getElementById(`btn-confirmar-${categoria}`).addEventListener('click', () => confirmarSelecao(codigo, categoria, catalogo));

    atualizarTotal(categoria, precos, precoStoriesFoto, precoStoryArte);
}

function atualizarTotal(categoria, precos, precoStoriesFoto, precoStoryArte) {
    const selecao = selecoes[categoria];
    let total = 0;
    total += selecao.videos.size * precos.videos;
    total += selecao.carrosseis.size * precos.carrosseis;
    total += selecao.posts.size * precos.posts;
    total += selecao.storiesFotograficos ? precoStoriesFoto : 0;
    total += selecao.storyArteQtd * precoStoryArte;
    document.getElementById(`total-valor-${categoria}`).textContent = fmtReal(total);
    return total;
}

/* ═══════════════════ CONFIRMAR SELEÇÃO ═══════════════════ */

async function confirmarSelecao(codigo, categoria, catalogo) {
    const btn = document.getElementById(`btn-confirmar-${categoria}`);
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    const selecao = selecoes[categoria];
    const itensSelecionados = [];
    (catalogo.videos || []).forEach((it, i) => {
        if (selecao.videos.has(`videos-${i}`)) itensSelecionados.push(`Reel — ${it.titulo}`);
    });
    (catalogo.carrosseis || []).forEach((it, i) => {
        if (selecao.carrosseis.has(`carrosseis-${i}`)) itensSelecionados.push(`Carrossel — ${it.titulo}`);
    });
    (catalogo.posts || []).forEach((it, i) => {
        if (selecao.posts.has(`posts-${i}`)) itensSelecionados.push(`Post estático — ${it.titulo}`);
    });
    if (selecao.storiesFotograficos) itensSelecionados.push('Stories Fotográficos (mês completo)');
    if (selecao.storyArteQtd > 0) itensSelecionados.push(`Story Arte avulso x${selecao.storyArteQtd}`);

    const total = document.getElementById(`total-valor-${categoria}`).textContent;
    const mesId = new Date().toISOString().slice(0, 7); // ex: "2026-07"
    const docId = `${mesId}-${categoria}`;

    try {
        await db.collection('clientes').doc(codigo).collection('selecoes').doc(docId).set({
            mes: catalogo.mes || mesId,
            categoria,
            itens: itensSelecionados,
            total,
            atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById(`catalogo-secao-${categoria}`).insertAdjacentHTML('beforeend', `
            <div class="confirm-success">Seleção enviada! Lohana vai receber esta escolha para o fechamento do mês.</div>
        `);
        btn.textContent = 'Seleção enviada ✓';
    } catch (err) {
        console.error(err);
        btn.disabled = false;
        btn.textContent = 'Confirmar seleção';
        alert('Não foi possível enviar agora. Tente novamente em instantes.');
    }
}
