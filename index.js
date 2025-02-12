import express from "express";
import autenticar from "./seguranca/autenticar.js";

const porta = 3000;
const localhost = "0.0.0.0"; //define nosso aplicativo estará disponível em todas as interfaces de redes deste computador

const app = express();

//o HTTP é um protocolo stateless (sem estabelecimento de sessão)
//o servidor recebe uma requisição, processa a requisição e envia uma resposta
//sem se preocupar em identificar os atores envolvidos

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
