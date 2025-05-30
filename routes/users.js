// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs'); // Para criptografia de senhas

// Rota para CRIAR um novo usuário (cadastro de pessoa)
router.post('/', async (req, res) => {
    const { email, senha, cpf } = req.body;

    if (!email || !senha || !cpf) {
        return res.status(400).json({ message: 'Email, Senha e CPF são obrigatórios.' });
    }

    try {
        // Verifica se o email ou CPF já existem
        const userExists = await db.query('SELECT id FROM users WHERE email = $1 OR cpf = $2', [email, cpf]);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'Email ou CPF já cadastrados.' });
        }

        // Criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(senha, 10);

        //const hashedPassword = await bcrypt.hash(senha, 10); // 10 é o custo do hash

        const result = await db.query(
            'INSERT INTO users (email, senha, cpf) VALUES ($1, $2, $3) RETURNING id, email, cpf',
            [email, hashedPassword, cpf]
        );
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: result.rows[0] });
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao cadastrar usuário.' });
    }
});

// Rota para OBTER TODOS os usuários
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT id, email, cpf FROM users ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao obter usuários:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao obter usuários.' });
    }
});

// Rota para OBTER UM USUÁRIO por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT id, email, cpf FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao obter usuário por ID:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao obter usuário.' });
    }
});

// Rota para ATUALIZAR UM USUÁRIO
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, senha, cpf } = req.body; // Senha é opcional para atualização

    if (!email && !senha && !cpf) {
        return res.status(400).json({ message: 'Pelo menos um campo (email, senha ou cpf) deve ser fornecido para atualização.' });
    }

    let queryParts = [];
    let queryValues = [];
    let paramIndex = 1;

    if (email) {
        queryParts.push(`email = $${paramIndex++}`);
        queryValues.push(email);
    }
    if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        queryParts.push(`senha = $${paramIndex++}`);
        queryValues.push(hashedPassword);
    }
    if (cpf) {
        queryParts.push(`cpf = $${paramIndex++}`);
        queryValues.push(cpf);
    }

    queryValues.push(id); // O ID é sempre o último parâmetro

    try {
        const queryText = `UPDATE users SET ${queryParts.join(', ')} WHERE id = $${paramIndex} RETURNING id, email, cpf`;
        const result = await db.query(queryText, queryValues);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: result.rows[0] });
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        // Pode ser um erro de UNIQUE CONSTRAINT se tentar atualizar email/cpf para um já existente
        if (err.code === '23505') { // PostgreSQL unique violation error code
            return res.status(409).json({ message: 'Email ou CPF já estão em uso por outro usuário.' });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.' });
    }
});

// Rota para DELETAR UM USUÁRIO
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado para exclusão.' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.' });
    }
});

module.exports = router;