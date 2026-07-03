# Página de Serviços — Creator Mobile

Site estático (GitHub Pages) com backend leve em Firebase Firestore, com três camadas de acesso:

1. **Pública** (`publico.html`) — explica o modelo de trabalho, sem valores. Link fixo, sem Firebase.
2. **Geral** (`index.html?c=geral`) — mostra só a tabela de valores padrão.
3. **Individual** (`index.html?c=CODIGO-DO-CLIENTE`) — conteúdo completo personalizado + tabela de valores + catálogo do mês interativo, com soma automática e envio da seleção.

URL real publicada: `lohanazanetti.github.io/portfolio/servicos/` — como este projeto vive dentro do repositório `portfolio` (e não em um repositório próprio chamado `lohanazanetti.github.io`), o GitHub Pages publica tudo sob o prefixo `/portfolio/`. Os links internos do site (botão do portfólio, link de acesso gerado no painel admin) já usam caminhos relativos e funcionam corretamente com esse prefixo.

## Arquivos

| Arquivo | Função |
|---|---|
| `publico.html` | Camada 1 — texto fixo, sem Firebase |
| `index.html` + `app.js` | Roteador das Camadas 2 e 3 — lê `?c=` e busca o cliente no Firestore |
| `admin.html` + `admin.js` + `admin.css` | Painel administrativo (login da Lohana) para cadastrar clientes, valores, textos e catálogo do mês |
| `seed-data.js` | Conteúdo de exemplo (código `geral` + `descontofacil-x7k2m9`), usado só no botão "Importar dados de exemplo" do admin |
| `firebase-config.js` | Credenciais do projeto Firebase — **precisa ser preenchido** (veja comentários no arquivo) |
| `firestore.rules` | Regras de segurança do Firestore — cole no console do Firebase |
| `style.css` / `admin.css` | Identidade visual Creator Mobile (mesma paleta/fontes do portfólio) |

## Configuração inicial (uma vez só)

1. Crie um projeto em [console.firebase.google.com](https://console.firebase.google.com).
2. Ative **Firestore Database** (modo produção) e, em **Authentication**, ative o provedor **E-mail/senha**. Crie um usuário (seu e-mail) — é o login do painel admin.
3. Em **Configurações do projeto > Geral > Seus apps**, registre um app Web e copie o `firebaseConfig` para `firebase-config.js`.
4. Cole o conteúdo de `firestore.rules` na aba **Regras** do Firestore e publique.
5. Nada a publicar separadamente: a pasta `/servicos` já faz parte do repositório `portfolio`, então basta o merge/push para `main` chegar ao GitHub Pages (o mesmo deploy que publica o portfólio).
6. Acesse `lohanazanetti.github.io/portfolio/servicos/admin.html`, faça login, e clique em **"Importar dados de exemplo"** para popular os códigos `geral` e `descontofacil-x7k2m9` com o conteúdo já combinado.

## Como adicionar um novo cliente (Glaucia, Roque, Marcos...)

Tudo pelo painel `admin.html`, sem mexer em código:

1. Faça login no painel.
2. Clique em **"+ novo cliente"** e defina um código único (ex: `glaucia-a1b2c3` — pode gerar qualquer string aleatória).
3. Preencha nome, tabela de valores, textos personalizados, simulações e catálogo do mês.
4. Clique em **"Salvar cliente"**.
5. O link de acesso aparece logo abaixo do botão salvar — envie esse link para o cliente (por WhatsApp, por exemplo).

Todo mês, para atualizar o catálogo: abra o cliente no painel, edite os itens de Vídeos/Carrosséis/Posts (ou o rótulo do mês) e salve de novo. O código de acesso do cliente não muda.

## Onde consultar o que o cliente escolheu

No painel, ao abrir um cliente, a seção **"Respostas enviadas pelo cliente"** mostra a última seleção confirmada, com os itens marcados e o total.

## Adicionar o botão no portfólio

Já foi adicionado um card em `index.html` (seção "Sites e Bio Links") apontando para `servicos/publico.html`.
