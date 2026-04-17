require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const db      = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Servir archivos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ LOGIN
app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ ok: false, message: 'Completa todos los campos' });
  }

  try {
    await db.query(
      'INSERT INTO usuarios (usuario, password) VALUES (?, ?)',
      [usuario, password]
    );

    res.json({ ok: true });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ ok: false, message: 'Error en servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
