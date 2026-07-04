/* ═══════════════════════════════════════════════════════════════
   app.js — roteador de acesso por código (Camada 2 e Camada 3)
   ═══════════════════════════════════════════════════════════════
   Lê o parâmetro ?c= da URL, busca o documento correspondente em
   clientes/{codigo} no Firestore e decide o que renderizar:
     - tipo "geral"      → só a tabela de valores (Camada 2)
     - tipo "individual" → conteúdo completo + link pro catálogo interativo (Camada 3)
     - tipo "redirect"   → código antigo (trocado), redireciona para o novo
     - documento inexistente → mensagem "acesso não encontrado"

   Lohana: TODO o conteúdo (textos, tabela de valores, catálogo do mês)
   fica no Firestore, editável pelo painel admin.html. Este arquivo não
   deve precisar ser alterado para adicionar um novo cliente — basta
   criar um novo documento em "clientes" com um novo código.

   O catálogo interativo do mês (checkboxes, total, confirmação) vive em
   catalogo.html + catalogo.js, aberto a partir do link ao final desta
   página. Este arquivo (e o próprio ?c= da URL) não muda.
   ═══════════════════════════════════════════════════════════════ */

const app = document.getElementById('app');

const params = new URLSearchParams(window.location.search);
const codigo = params.get('c');

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

        <section class="block reveal">
            <h2 class="block-title">Catálogo do mês</h2>
            <p class="block-text" style="margin-bottom:20px;">
                Confira o leque de opções deste mês, separado por Farmácia/Vacinas e Academia,
                e monte sua seleção na página do catálogo.
            </p>
            <a class="btn-primary" href="catalogo.html?c=${codigo}" target="_blank" style="display:inline-block;text-decoration:none;">Ver catálogo do mês</a>
        </section>

        <div class="content-spacer"></div>
    `;

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

/* O catálogo interativo do mês (checkboxes, total, confirmação) foi movido
   inteiramente para catalogo.js — veja catalogo.html?c=CODIGO. */
