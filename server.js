require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
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
 
// LOGIN
app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;
 
  if (!usuario || !password) {
    return res.status(400).json({ ok: false, message: 'Por favor completa todos los campos' });
  }
 
  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );
 
    if (rows.length === 0) {
      return res.status(401).json({ ok: false, message: 'Usuario o contraseña incorrectos' });
    }
 
    const usuarioEncontrado = rows[0];
    const passwordCorrecta = await bcrypt.compare(password, usuarioEncontrado.password);
 
    if (!passwordCorrecta) {
      return res.status(401).json({ ok: false, message: 'Usuario o contraseña incorrectos' });
    }
 
    res.json({ ok: true, message: 'Bienvenido ' + usuarioEncontrado.usuario });
 
  } catch (err) {
    console.error('Error en login:', err.message);
    res.status(500).json({ ok: false, message: 'Error en el servidor, intenta de nuevo' });
  }
});
 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
