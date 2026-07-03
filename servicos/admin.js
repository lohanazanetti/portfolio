/* ═══════════════════════════════════════════════════════════════
   admin.js — painel administrativo (clientes / catálogo / valores)
   ═══════════════════════════════════════════════════════════════
   Protegido por Firebase Authentication (e-mail/senha). Só quem
   tiver login criado no console do Firebase (Build > Authentication)
   consegue entrar aqui. O acesso dos clientes (index.html) nunca
   passa por login — é só a URL com o código.

   Lohana: é por AQUI que você cadastra um novo cliente, atualiza a
   tabela de valores, troca o catálogo do mês e lê o que cada cliente
   selecionou. Nenhuma dessas ações exige mexer em código.
   ═══════════════════════════════════════════════════════════════ */

const auth = firebase.auth();

let clienteAtualCodigo = null; // código sendo editado no momento (null = novo cliente)

/* ═══════════════════ AUTENTICAÇÃO ═══════════════════ */

auth.onAuthStateChanged(user => {
    document.getElementById('tela-login').style.display = user ? 'none' : 'block';
    document.getElementById('painel').style.display = user ? 'block' : 'none';
    document.getElementById('btn-logout').style.display = user ? 'inline-block' : 'none';
    if (user) carregarListaClientes();
});

document.getElementById('btn-login').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value;
    const erroEl = document.getElementById('login-erro');
    erroEl.style.display = 'none';
    auth.signInWithEmailAndPassword(email, senha).catch(err => {
        erroEl.textContent = 'Não foi possível entrar. Confira o e-mail e a senha.';
        erroEl.style.display = 'block';
        console.error(err);
    });
});

document.getElementById('btn-logout').addEventListener('click', () => auth.signOut());

/* ═══════════════════ LISTA DE CLIENTES ═══════════════════ */

async function carregarListaClientes() {
    const container = document.getElementById('lista-clientes');
    container.innerHTML = 'Carregando…';
    const snap = await db.collection('clientes').get();
    if (snap.empty) {
        container.innerHTML = '<p class="block-text">Nenhum cliente cadastrado ainda.</p>';
        return;
    }
    container.innerHTML = '';
    snap.forEach(doc => {
        const data = doc.data();
        const item = document.createElement('div');
        item.className = 'admin-cliente-item';
        item.innerHTML = `
            <span>${doc.id}${data.nome ? ' — ' + data.nome : ''}</span>
            <span class="admin-cliente-badge">${data.tipo}</span>
        `;
        item.addEventListener('click', () => carregarCliente(doc.id));
        container.appendChild(item);
    });
}

document.getElementById('btn-novo-cliente').addEventListener('click', () => {
    const codigo = prompt('Código do novo cliente (usado na URL, ex: glaucia-a1b2c3):');
    if (!codigo) return;
    clienteAtualCodigo = null;
    abrirEditor({ tipo: 'individual', valores: VALORES_PADRAO }, codigo, /*novo=*/true);
});

/* ═══════════════════ CARREGAR / ABRIR EDITOR ═══════════════════ */

async function carregarCliente(codigo) {
    const doc = await db.collection('clientes').doc(codigo).get();
    if (!doc.exists) return;
    clienteAtualCodigo = codigo;
    abrirEditor(doc.data(), codigo, /*novo=*/false);
    carregarRespostas(codigo);
}

function abrirEditor(data, codigo, novo) {
    document.getElementById('editor-cliente').style.display = 'block';

    document.getElementById('f-codigo').value = codigo || '';
    document.getElementById('f-codigo').disabled = !novo;
    document.getElementById('f-tipo').value = data.tipo || 'individual';
    document.getElementById('f-nome').value = data.nome || '';

    // valores
    const listaValores = document.getElementById('lista-valores');
    listaValores.innerHTML = '';
    (data.valores || VALORES_PADRAO).forEach(v => linhaValor(v.item, v.valor, v.unidade));

    // textos
    const t = data.textos || {};
    document.getElementById('f-abertura').value = t.abertura || '';
    document.getElementById('f-comoFunciona').value = t.comoFunciona || '';
    document.getElementById('f-porQueAtualizado').value = t.porQueAtualizado || '';
    document.getElementById('f-fluxoAprovacao').value = t.fluxoAprovacao || '';
    document.getElementById('f-extensaoAcademia').value = t.extensaoAcademia || '';

    // simulações
    const listaSim = document.getElementById('lista-simulacoes');
    listaSim.innerHTML = '';
    (data.simulacoes || []).forEach(s => linhaSimulacao(s.composicao, s.valor));

    // catálogo
    document.getElementById('f-catalogo-mes').value = (data.catalogo && data.catalogo.mes) || '';
    ['videos', 'carrosseis', 'posts'].forEach(grupo => {
        const el = document.querySelector(`.lista-catalogo[data-grupo="${grupo}"]`);
        el.innerHTML = '';
        const itens = (data.catalogo && data.catalogo[grupo]) || [];
        itens.forEach(it => linhaCatalogo(grupo, it.titulo, it.roteiro));
    });

    atualizarVisibilidadeTipo();

    const linkAcesso = document.getElementById('link-acesso');
    if (!novo && codigo) {
        const url = `${window.location.origin}${window.location.pathname.replace('admin.html', '')}?c=${codigo}`;
        linkAcesso.href = url;
        linkAcesso.textContent = url;
    } else {
        linkAcesso.textContent = '';
        linkAcesso.removeAttribute('href');
    }

    document.getElementById('salvar-status').textContent = '';
    document.getElementById('secao-respostas').style.display = novo ? 'none' : 'block';
    if (novo) document.getElementById('lista-respostas').innerHTML = '';
}

document.getElementById('f-tipo').addEventListener('change', atualizarVisibilidadeTipo);
function atualizarVisibilidadeTipo() {
    const individual = document.getElementById('f-tipo').value === 'individual';
    document.getElementById('campos-individual').style.display = individual ? 'block' : 'none';
    document.getElementById('bloco-individual').style.display = individual ? 'block' : 'none';
}

/* ═══════════════════ LINHAS DINÂMICAS ═══════════════════ */

function linhaGenerica(container, camposHTML, onRemove) {
    const row = document.createElement('div');
    row.className = 'admin-row';
    row.innerHTML = camposHTML + '<button type="button" class="admin-row-remove">×</button>';
    row.querySelector('.admin-row-remove').addEventListener('click', () => row.remove());
    container.appendChild(row);
    return row;
}

function linhaValor(item = '', valor = '', unidade = 'unidade') {
    linhaGenerica(document.getElementById('lista-valores'), `
        <input type="text" class="admin-input v-item" placeholder="Item (ex: Reel)" value="${item}">
        <input type="number" class="admin-input v-valor" placeholder="Valor" value="${valor}" style="max-width:110px;">
        <input type="text" class="admin-input v-unidade" placeholder="unidade / mês" value="${unidade}" style="max-width:120px;">
    `);
}
document.getElementById('btn-add-valor').addEventListener('click', () => linhaValor());

function linhaSimulacao(composicao = '', valor = '') {
    linhaGenerica(document.getElementById('lista-simulacoes'), `
        <input type="text" class="admin-input s-composicao" placeholder="Composição (ex: 2 Reels + 3 Carrosséis)" value="${composicao}">
        <input type="number" class="admin-input s-valor" placeholder="Valor total" value="${valor}" style="max-width:110px;">
    `);
}
document.getElementById('btn-add-sim').addEventListener('click', () => linhaSimulacao());

function linhaCatalogo(grupo, titulo = '', roteiro = '') {
    const container = document.querySelector(`.lista-catalogo[data-grupo="${grupo}"]`);
    linhaGenerica(container, `
        <div style="flex:1;">
            <input type="text" class="admin-input c-titulo" placeholder="Título" value="${(titulo || '').replace(/"/g, '&quot;')}">
            <textarea class="admin-textarea c-roteiro" placeholder="Roteiro / legenda" style="min-height:60px;">${roteiro || ''}</textarea>
        </div>
    `);
}
document.querySelectorAll('[data-add-catalogo]').forEach(btn => {
    btn.addEventListener('click', () => linhaCatalogo(btn.dataset.addCatalogo));
});

/* ═══════════════════ SALVAR CLIENTE ═══════════════════ */

document.getElementById('btn-salvar-cliente').addEventListener('click', async () => {
    const codigo = document.getElementById('f-codigo').value.trim();
    const status = document.getElementById('salvar-status');
    if (!codigo) {
        status.textContent = 'Informe um código para o cliente.';
        return;
    }

    const tipo = document.getElementById('f-tipo').value;

    const valores = Array.from(document.querySelectorAll('#lista-valores .admin-row')).map(row => ({
        item: row.querySelector('.v-item').value.trim(),
        valor: Number(row.querySelector('.v-valor').value) || 0,
        unidade: row.querySelector('.v-unidade').value.trim() || 'unidade'
    })).filter(v => v.item);

    const data = { tipo, valores };

    if (tipo === 'individual') {
        data.nome = document.getElementById('f-nome').value.trim();
        data.textos = {
            abertura: document.getElementById('f-abertura').value,
            comoFunciona: document.getElementById('f-comoFunciona').value,
            porQueAtualizado: document.getElementById('f-porQueAtualizado').value,
            fluxoAprovacao: document.getElementById('f-fluxoAprovacao').value,
            extensaoAcademia: document.getElementById('f-extensaoAcademia').value
        };
        data.simulacoes = Array.from(document.querySelectorAll('#lista-simulacoes .admin-row')).map(row => ({
            composicao: row.querySelector('.s-composicao').value.trim(),
            valor: Number(row.querySelector('.s-valor').value) || 0
        })).filter(s => s.composicao);

        data.catalogo = { mes: document.getElementById('f-catalogo-mes').value.trim() };
        ['videos', 'carrosseis', 'posts'].forEach(grupo => {
            const rows = document.querySelectorAll(`.lista-catalogo[data-grupo="${grupo}"] .admin-row`);
            data.catalogo[grupo] = Array.from(rows).map(row => ({
                titulo: row.querySelector('.c-titulo').value.trim(),
                roteiro: row.querySelector('.c-roteiro').value.trim()
            })).filter(it => it.titulo);
        });
    }

    status.textContent = 'Salvando…';
    try {
        await db.collection('clientes').doc(codigo).set(data);
        status.textContent = 'Salvo com sucesso.';
        clienteAtualCodigo = codigo;
        carregarListaClientes();
        carregarCliente(codigo);
    } catch (err) {
        console.error(err);
        status.textContent = 'Erro ao salvar. Tente novamente.';
    }
});

/* ═══════════════════ RESPOSTAS DO CLIENTE ═══════════════════ */

async function carregarRespostas(codigo) {
    const container = document.getElementById('lista-respostas');
    container.innerHTML = 'Carregando…';
    const snap = await db.collection('clientes').doc(codigo).collection('selecoes')
        .orderBy('atualizadoEm', 'desc').get();
    if (snap.empty) {
        container.innerHTML = 'Nenhuma seleção enviada ainda.';
        return;
    }
    container.innerHTML = snap.docs.map(doc => {
        const d = doc.data();
        return `
            <div style="background:var(--bg-2);border-radius:12px;padding:14px;margin-bottom:10px;">
                <strong style="color:var(--white);">${d.mes || doc.id}</strong> — <span style="color:var(--accent);">${d.total || ''}</span>
                <ul style="margin-top:8px;padding-left:18px;">
                    ${(d.itens || []).map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
        `;
    }).join('');
}

/* ═══════════════════ IMPORTAR DADOS DE EXEMPLO ═══════════════════ */

document.getElementById('btn-seed').addEventListener('click', async () => {
    const status = document.getElementById('seed-status');
    if (!confirm('Isso vai sobrescrever os códigos "geral" e "descontofacil-x7k2m9". Continuar?')) return;
    status.textContent = 'Importando…';
    try {
        await Promise.all(
            Object.entries(SEED_DATA).map(([codigo, data]) => db.collection('clientes').doc(codigo).set(data))
        );
        status.textContent = 'Dados importados com sucesso.';
        carregarListaClientes();
    } catch (err) {
        console.error(err);
        status.textContent = 'Erro ao importar.';
    }
});
