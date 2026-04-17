// db.js — Conexión a MySQL con mysql2
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT || 3306,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false }
});

// Verificar conexión al arrancar
pool.getConnection()
  .then(conn => {
    console.log('✅  MySQL conectado correctamente');
    conn.release();
  })
  .catch(err => {
    console.error('❌  Error conectando a MySQL:', JSON.stringify(err));
    process.exit(1);
  });

module.exports = pool;
