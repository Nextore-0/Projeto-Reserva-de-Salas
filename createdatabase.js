const { Client } = require('pg');

const dbName = 'meu_banco';

async function createDatabaseIfNotExists() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    port: 5432,
    database: 'postgres', // conecta ao banco padrão
  });

  try {
    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Banco de dados '${dbName}' criado com sucesso.`);
    } else {
      console.log(`Banco de dados '${dbName}' já existe.`);
    }
  } catch (err) {
    console.error('Erro ao criar banco de dados:', err);
  } finally {
    await client.end();
  }
}

module.exports = createDatabaseIfNotExists;
