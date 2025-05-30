// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para acessar process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
    // Obter o token do cabeçalho da requisição (geralmente "Bearer TOKEN")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega a segunda parte (o token em si)

    if (token == null) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' }); // Não autorizado
    }

    // Verificar o token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Erro na verificação do token:', err);
            return res.status(403).json({ message: 'Token inválido ou expirado.' }); // Proibido (token inválido)
        }
        req.user = user; // Anexa as informações do usuário decodificadas à requisição
        next(); // Passa para o próximo middleware ou rota
    });
};

module.exports = authenticateToken;