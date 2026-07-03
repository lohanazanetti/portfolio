/* ═══════════════════════════════════════════════════════════════
   app.js — roteador de acesso por código (Camada 2 e Camada 3)
   ═══════════════════════════════════════════════════════════════
   Lê o parâmetro ?c= da URL, busca o documento correspondente em
   clientes/{codigo} no Firestore e decide o que renderizar:
     - tipo "geral"      → só a tabela de valores (Camada 2)
     - tipo "individual" → conteúdo completo + catálogo interativo (Camada 3)
     - tipo "redirect"   → código antigo (trocado), redireciona para o novo
     - documento inexistente → mensagem "acesso não encontrado"

   Lohana: TODO o conteúdo (textos, tabela de valores, catálogo do mês)
   fica no Firestore, editável pelo painel admin.html. Este arquivo não
   deve precisar ser alterado para adicionar um novo cliente — basta
   criar um novo documento em "clientes" com um novo código.
   ═══════════════════════════════════════════════════════════════ */

const app = document.getElementById('app');

const params = new URLSearchParams(window.location.search);
const codigo = params.get('c');

/* estado da seleção interativa da Camada 3 */
const selecao = {
    videos: new Set(),
    carrosseis: new Set(),
    posts: new Set(),
    storiesFotograficos: false,
    storyArteQtd: 0
};

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
        } else if (data.tipo === 'geral') {
            renderGeral(data);
        } else if (data.tipo === 'individual') {
            renderIndividual(codigo, data);
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

function tabelaValoresHTML(valores) {
    const linhas = (valores || []).map(v => `
        <tr>
            <td>${v.item}</td>
            <td>${fmtReal(Number(v.valor))} /${v.unidade || 'unidade'}</td>
        </tr>
    `).join('');
    return `
        <table class="valores-table">
            <thead><tr><th>Item</th><th>Valor</th></tr></thead>
            <tbody>${linhas}</tbody>
        </table>
    `;
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

/* ═══════════════════ CAMADA 2 — CÓDIGO GERAL ═══════════════════ */

function renderGeral(data) {
    app.innerHTML = `
        <div class="page-hero reveal">
            <p class="page-eyebrow">Creator Mobile</p>
            <h1 class="page-title">Valores dos serviços</h1>
        </div>
        <section class="block reveal">
            ${tabelaValoresHTML(data.valores)}
        </section>
        <div class="content-spacer"></div>
    `;
    observeReveal();
}

/* ═══════════════════ CAMADA 3 — CÓDIGO INDIVIDUAL ═══════════════════ */

function renderIndividual(codigo, data) {
    const t = data.textos || {};
    const valores = data.valores || [];
    const catalogo = data.catalogo || {};

    app.innerHTML = `
        <div class="page-hero reveal">
            <p class="page-eyebrow">Creator Mobile · ${data.nome || ''}</p>
            <h1 class="page-title">Atualização de parceria</h1>
        </div>

        ${bloco(t.abertura)}
        ${bloco(t.comoFunciona, 'Como o trabalho funciona')}

        <section class="block reveal">
            <h2 class="block-title">Tabela de valores unitários</h2>
            ${tabelaValoresHTML(valores)}
        </section>

        ${bloco(t.porQueAtualizado, 'Por que os valores foram atualizados')}
        ${bloco(t.fluxoAprovacao, 'Fluxo de aprovação e contratação mensal')}

        ${simulacoesHTML(data.simulacoes)}

        ${bloco(t.extensaoAcademia, 'Extensão do modelo')}

        <section class="block reveal" id="catalogo-secao">
            <h2 class="block-title">Catálogo do mês${catalogo.mes ? ' — ' + catalogo.mes : ''}</h2>
            <p class="block-text" style="margin-bottom:20px;">
                Marque os itens que fazem sentido para este mês. O valor total é somado
                automaticamente e fica visível na barra abaixo.
            </p>
            <div id="catalogo-interativo"></div>
        </section>

        <div class="content-spacer"></div>
        <div class="content-spacer"></div>

        <div class="total-bar">
            <div>
                <div class="total-bar-label">Total selecionado</div>
                <div class="total-bar-value" id="total-valor">R$ 0,00</div>
            </div>
            <button class="btn-primary" id="btn-confirmar">Confirmar seleção</button>
        </div>
    `;

    renderCatalogoInterativo(valores, catalogo);
    document.getElementById('btn-confirmar').addEventListener('click', () => confirmarSelecao(codigo, catalogo));
    observeReveal();
}

function bloco(texto, titulo) {
    if (!texto) return '';
    const paragrafos = texto.split('\n\n').map(p => `<p class="block-text">${p}</p>`).join('');
    return `
        <section class="block reveal">
            ${titulo ? `<h2 class="block-title">${titulo}</h2>` : ''}
            ${paragrafos}
        </section>
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

/* ═══════════════════ CATÁLOGO INTERATIVO ═══════════════════ */

function renderCatalogoInterativo(valores, catalogo) {
    const precoReel = getValorItem(valores, 'Reel');
    const precoCarrossel = getValorItem(valores, 'Carrossel');
    const precoPost = getValorItem(valores, 'Post estático');
    const precoStoriesFoto = getValorItem(valores, 'Stories Fotográficos');
    const precoStoryArte = getValorItem(valores, 'Story Arte');

    const videos = catalogo.videos || [];
    const carrosseis = catalogo.carrosseis || [];
    const posts = catalogo.posts || [];

    const grupo = (titulo, itens, categoria, preco) => {
        if (!itens.length) return '';
        const itensHTML = itens.map((it, i) => `
            <label class="catalogo-item" data-cat="${categoria}" data-idx="${i}">
                <input type="checkbox">
                <div class="catalogo-item-body">
                    <div class="catalogo-item-title">${it.titulo}</div>
                    <div class="catalogo-item-desc">${it.roteiro || it.descricao || ''}</div>
                </div>
                <div class="catalogo-item-price">${fmtReal(preco)}</div>
            </label>
        `).join('');
        return `
            <div class="catalogo-group">
                <div class="catalogo-group-title">${titulo}</div>
                ${itensHTML}
            </div>
        `;
    };

    const container = document.getElementById('catalogo-interativo');
    container.innerHTML = `
        <div class="catalogo-group">
            <div class="catalogo-group-title">Itens fixos do mês</div>
            <label class="catalogo-fixed">
                <input type="checkbox" id="chk-stories-foto">
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
                    <button type="button" class="qty-btn" id="qty-menos">–</button>
                    <span class="qty-value" id="qty-valor">0</span>
                    <button type="button" class="qty-btn" id="qty-mais">+</button>
                </div>
            </div>
        </div>
        ${grupo('Vídeos', videos, 'videos', precoReel)}
        ${grupo('Carrosséis', carrosseis, 'carrosseis', precoCarrossel)}
        ${grupo('Posts estáticos', posts, 'posts', precoPost)}
    `;

    const precos = { videos: precoReel, carrosseis: precoCarrossel, posts: precoPost };

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
            atualizarTotal(precos, precoStoriesFoto, precoStoryArte);
        });
    });

    const chkStoriesFoto = document.getElementById('chk-stories-foto');
    chkStoriesFoto.addEventListener('change', () => {
        selecao.storiesFotograficos = chkStoriesFoto.checked;
        atualizarTotal(precos, precoStoriesFoto, precoStoryArte);
    });

    const qtyValor = document.getElementById('qty-valor');
    document.getElementById('qty-mais').addEventListener('click', () => {
        selecao.storyArteQtd++;
        qtyValor.textContent = selecao.storyArteQtd;
        atualizarTotal(precos, precoStoriesFoto, precoStoryArte);
    });
    document.getElementById('qty-menos').addEventListener('click', () => {
        if (selecao.storyArteQtd > 0) selecao.storyArteQtd--;
        qtyValor.textContent = selecao.storyArteQtd;
        atualizarTotal(precos, precoStoriesFoto, precoStoryArte);
    });

    atualizarTotal(precos, precoStoriesFoto, precoStoryArte);
}

function atualizarTotal(precos, precoStoriesFoto, precoStoryArte) {
    let total = 0;
    total += selecao.videos.size * precos.videos;
    total += selecao.carrosseis.size * precos.carrosseis;
    total += selecao.posts.size * precos.posts;
    total += selecao.storiesFotograficos ? precoStoriesFoto : 0;
    total += selecao.storyArteQtd * precoStoryArte;
    document.getElementById('total-valor').textContent = fmtReal(total);
    return total;
}

/* ═══════════════════ CONFIRMAR SELEÇÃO ═══════════════════ */

async function confirmarSelecao(codigo, catalogo) {
    const btn = document.getElementById('btn-confirmar');
    btn.disabled = true;
    btn.textContent = 'Enviando…';

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

    const total = document.getElementById('total-valor').textContent;
    const mesId = new Date().toISOString().slice(0, 7); // ex: "2026-07"

    try {
        await db.collection('clientes').doc(codigo).collection('selecoes').doc(mesId).set({
            mes: catalogo.mes || mesId,
            itens: itensSelecionados,
            total,
            atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('catalogo-secao').insertAdjacentHTML('beforeend', `
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
