// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json()); // Mantenha esta linha ANTES das rotas da API!

// Importa a conexão com o banco de dados
require('./config/db');

// Importa as rotas
const userRoutes = require('./routes/users.js');
const salaRoutes = require('./routes/salas.js');

const authRoutes = require('./routes/auth'); // Importa as rotas de autenticação
const authenticateToken = require('./middleware/auth'); // Importa o middleware de autenticação

// Rotas da API principal (agora que express.json está antes, devem funcionar!)
app.use('/api/users', userRoutes);
app.use('/api/salas', salaRoutes);

// Rota de autenticação (login)
app.use('/api/auth', authRoutes); // Ex: POST /api/auth/login

// Exemplo de Rota Protegida
// Esta rota só poderá ser acessada se um JWT válido for fornecido no cabeçalho Authorization
app.get('/api/protected', authenticateToken, (req, res) => {
    res.status(200).json({
        message: 'Você acessou uma rota protegida!',
        user: req.user // Informações do usuário do token
    });
});

// Middleware para servir arquivos estáticos (colocado após as rotas da API para evitar conflitos)
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão (se o express.static não servir o index.html por algum motivo, esta seria um fallback)
app.get('/', (req, res) => {
    res.send('Sistema de Cadastro de Pessoas e Salas API Online!');
});

// Tratamento de erros genérico
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});