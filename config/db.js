// config/db.js
require('dotenv').config();
console.log('DB_USER:', process.env.DB_USER); // Adicione esta linha
console.log('DB_DATABASE:', process.env.DB_DATABASE); // Adicione esta linha
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Conectado ao banco de dados PostgreSQL!');
});

pool.on('error', (err) => {
    console.error('Erro na conexão com o banco de dados:', err.message);
    process.exit(-1); // Encerra a aplicação em caso de erro crítico de conexão
});

module.exports = pool;