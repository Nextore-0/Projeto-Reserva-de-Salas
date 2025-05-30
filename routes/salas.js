// routes/salas.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para CRIAR uma nova entrada de sala
router.post('/', async (req, res) => {
    const { id_sala_informado, status, data_entrada, data_saida } = req.body;

    if (!id_sala_informado || !data_entrada || !data_saida) {
        return res.status(400).json({ message: 'ID da sala, Data de Entrada e Data de Saída são obrigatórios.' });
    }

    // Validação básica de datas (pode ser mais robusta)
    const entrada = new Date(data_entrada);
    const saida = new Date(data_saida);

    if (isNaN(entrada.getTime()) || isNaN(saida.getTime()) || entrada >= saida) {
        return res.status(400).json({ message: 'Datas de entrada/saída inválidas ou data de entrada é igual/posterior à data de saída.' });
    }

    try {
        const result = await db.query(
            'INSERT INTO salas (id_sala_informado, status, data_entrada, data_saida) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_sala_informado, status || 'disponível', entrada, saida]
        );
        res.status(201).json({ message: 'Entrada de sala registrada com sucesso!', sala: result.rows[0] });
    } catch (err) {
        console.error('Erro ao registrar entrada de sala:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao registrar entrada de sala.' });
    }
});

// Rota para OBTER TODAS as entradas de sala
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM salas ORDER BY data_entrada DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao obter entradas de sala:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao obter entradas de sala.' });
    }
});

// Rota para OBTER UMA ENTRADA DE SALA por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM salas WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Entrada de sala não encontrada.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao obter entrada de sala por ID:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao obter entrada de sala.' });
    }
});

// Rota para ATUALIZAR UMA ENTRADA DE SALA
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_sala_informado, status, data_entrada, data_saida } = req.body;

    let queryParts = [];
    let queryValues = [];
    let paramIndex = 1;

    if (id_sala_informado !== undefined) {
        queryParts.push(`id_sala_informado = $${paramIndex++}`);
        queryValues.push(id_sala_informado);
    }
    if (status !== undefined) {
        queryParts.push(`status = $${paramIndex++}`);
        queryValues.push(status);
    }
    if (data_entrada !== undefined) {
        const entrada = new Date(data_entrada);
        if (isNaN(entrada.getTime())) return res.status(400).json({ message: 'Data de entrada inválida.' });
        queryParts.push(`data_entrada = $${paramIndex++}`);
        queryValues.push(entrada);
    }
    if (data_saida !== undefined) {
        const saida = new Date(data_saida);
        if (isNaN(saida.getTime())) return res.status(400).json({ message: 'Data de saída inválida.' });
        queryParts.push(`data_saida = $${paramIndex++}`);
        queryValues.push(saida);
    }

    if (queryParts.length === 0) {
        return res.status(400).json({ message: 'Nenhum campo para atualização fornecido.' });
    }

    // Adicione validação de datas se ambas forem fornecidas e entrada for >= saída
    if (data_entrada && data_saida) {
        const entrada = new Date(data_entrada);
        const saida = new Date(data_saida);
        if (entrada >= saida) {
            return res.status(400).json({ message: 'Data de entrada deve ser anterior à data de saída.' });
        }
    }


    queryValues.push(id); // O ID é sempre o último parâmetro

    try {
        const queryText = `UPDATE salas SET ${queryParts.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
        const result = await db.query(queryText, queryValues);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Entrada de sala não encontrada para atualização.' });
        }
        res.status(200).json({ message: 'Entrada de sala atualizada com sucesso!', sala: result.rows[0] });
    } catch (err) {
        console.error('Erro ao atualizar entrada de sala:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar entrada de sala.' });
    }
});

// Rota para DELETAR UMA ENTRADA DE SALA
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM salas WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Entrada de sala não encontrada para exclusão.' });
        }
        res.status(200).json({ message: 'Entrada de sala deletada com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar entrada de sala:', err);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar entrada de sala.' });
    }
});

module.exports = router;