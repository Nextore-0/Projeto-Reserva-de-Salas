// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importa a biblioteca JWT
require('dotenv').config(); // Para acessar process.env.JWT_SECRET

// Rota de Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // 1. Buscar o usuário pelo email
        const userResult = await db.query('SELECT id, email, senha FROM users WHERE email = $1', [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas.' }); // Email não encontrado
        }

        const user = userResult.rows[0];

        // 2. Comparar a senha fornecida com a senha hash armazenada
        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' }); // Senha incorreta
        }

        // 3. Se as credenciais estiverem corretas, gerar um JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload do token (informações do usuário)
            process.env.JWT_SECRET,             // Chave secreta para assinar o token
            { expiresIn: '1h' }                 // Tempo de expiração do token (ex: 1 hora)
        );

        res.status(200).json({ message: 'Login bem-sucedido!', token: token, user: { id: user.id, email: user.email } });

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno do servidor durante o login.' });
    }
});

module.exports = router;