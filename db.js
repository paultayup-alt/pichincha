// db.js
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

pool.getConnection()
  .then(conn => {
    console.log('✅  MySQL conectado correctamente');
    conn.release();
  })
  .catch(err => {
    console.error('❌  Error conectando a MySQL:', JSON.stringify(err));
    console.error('❌  Error conectando a MySQL:', err.message);
  });

module.exports = pool;
