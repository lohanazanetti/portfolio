/* ═══════════════════════════════════════════════════════════════
   CONFIGURAÇÃO DO FIREBASE
   ═══════════════════════════════════════════════════════════════
   Lohana, é AQUI que você cola as credenciais do seu projeto Firebase.

   Como conseguir esses valores:
   1. Acesse https://console.firebase.google.com e crie um projeto
      (ex: "servicos-creator-mobile").
   2. Dentro do projeto, ative o "Firestore Database" (modo produção)
      e, em Build > Authentication, ative o provedor "E-mail/senha"
      (é só o que o painel admin.html usa para o seu login).
   3. Em "Configurações do projeto" (ícone de engrenagem) > "Geral",
      role até "Seus apps", clique no ícone "</>" (Web) e registre um
      app. O Firebase vai te mostrar um objeto firebaseConfig igual
      ao de baixo — copie os valores para cá.
   4. Aplique as regras do arquivo firestore.rules no console do
      Firestore (aba "Regras").

   Este arquivo é público (fica no GitHub Pages), mas isso é normal:
   a apiKey do Firebase não é secreta, ela só identifica o projeto.
   Quem realmente protege os dados são as regras do Firestore
   (firestore.rules) e a autenticação do painel admin.
   ═══════════════════════════════════════════════════════════════ */

const firebaseConfig = {
    apiKey: "COLE_AQUI_SUA_API_KEY",
    authDomain: "COLE_AQUI.firebaseapp.com",
    projectId: "COLE_AQUI_O_PROJECT_ID",
    storageBucket: "COLE_AQUI.appspot.com",
    messagingSenderId: "COLE_AQUI",
    appId: "COLE_AQUI"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
