const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Obrigado!</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Obrigado pela sua sugestão!</h1>
                <p>Recebemos a sua ideia para o lanche:</p>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                <br>
                <a href="/">Voltar para a página inicial</a>
            </div>
        </body>
        </html>
    `);
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Contato Recebido</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Contato Recebido com Sucesso!</h1>
                <p>Obrigado por entrar em contato, <strong>${nome}</strong>.</p>
                <p>Recebemos sua mensagem e responderemos em breve no e-mail: <strong>${email}</strong></p>
                <hr>
                <h3>Resumo da sua mensagem:</h3>
                <p><strong>Assunto:</strong> ${assunto}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
                <br>
                <a href="/">Voltar para a página inicial</a>
            </div>
        </body>
        </html>
    `);
});

app.get('/api/lanches', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});