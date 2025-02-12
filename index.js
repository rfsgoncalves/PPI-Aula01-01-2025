import express from "express";
import autenticar from "./seguranca/autenticar.js";
import session from "express-session";

const porta = 3000;
const localhost = "0.0.0.0"; //define nosso aplicativo estará disponível em todas as interfaces de redes deste computador

const app = express();

//configurar como o express irá processar os parâmetros do formulário
app.use(express.urlencoded({extended: true})); //biblioteca QS /QueryString


app.use(session({
    secret: "m1Nh4Ch4v3S3cR3t4", //variáveis de ambiente
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15 //15 minutos de sessão
    }
}));

//o HTTP é um protocolo stateless (sem estabelecimento de sessão)
//o servidor recebe uma requisição, processa a requisição e envia uma resposta
//sem se preocupar em identificar os atores envolvidos

//Com o auxílio da biblioteca express-session
//Vamos implementar a habilidade de estabelecer uma sessão 
//para um determinado usuário


//oferecer o recurso login
app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
})

app.post("/login",(requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === "admin" && senha === "admin") {
        requisicao.session.autenticado = true;
        resposta.redirect('/menu.html');
    } else {
        resposta.redirect('/login.html');
    }
});

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect('/login.html');
})

//prepara o servidor para disponibilizar recursos estáticos
//erro: http://localhost:3000/publico/index.html
//certo: http://localhost:3000/index.html
app.use(express.static("./publico"));

//disponibilizando os arquivos da pasta privada
//a função autenticar se comporta como um middleware (atua na camada do meio)
app.use(autenticar, express.static("./privado"));


app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
});
