# 🏦 Banco Pichincha – Login con Node.js + MySQL

## 📁 Estructura del proyecto

```
proyecto-login/
├── public/
│   └── index.html       ← Tu página de login (frontend)
├── .env                 ← Variables de configuración (DB, JWT)
├── db.js                ← Conexión a MySQL
├── server.js            ← Servidor Express + rutas API
├── database.sql         ← Script para crear la base de datos
└── package.json         ← Dependencias del proyecto
```

---

## 🚀 Pasos para poner en marcha

### 1. Instalar Node.js
Descarga desde: https://nodejs.org (versión LTS)

### 2. Abrir la carpeta en VS Code
```
Archivo → Abrir carpeta → selecciona "proyecto-login"
```

### 3. Instalar dependencias
Abre la terminal de VS Code (Ctrl + ñ) y ejecuta:
```bash
npm install
```

### 4. Iniciar XAMPP
- Abre XAMPP Control Panel
- Haz clic en **Start** en Apache y MySQL

### 5. Crear la base de datos
- Abre el navegador: http://localhost/phpmyadmin
- Haz clic en **SQL** (pestaña superior)
- Pega el contenido de `database.sql` y ejecuta

### 6. Configurar .env
Abre el archivo `.env` y verifica:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          ← vacío si no pusiste contraseña en XAMPP
DB_NAME=banco_pichincha
JWT_SECRET=cambia_esto_por_algo_secreto
```

### 7. Iniciar el servidor
```bash
npm start
```
Verás en la terminal:
```
✅  MySQL conectado correctamente
🚀  Servidor corriendo en http://localhost:3000
```

### 8. Abrir la app
En tu navegador: **http://localhost:3000**

---

## 🔗 Rutas disponibles (API)

| Método | Ruta           | Descripción                  |
|--------|----------------|------------------------------|
| POST   | /api/registro  | Crear nuevo usuario          |
| POST   | /api/login     | Iniciar sesión, retorna JWT  |
| GET    | /api/perfil    | Ver perfil (requiere token)  |

---

## 🔒 Seguridad implementada

- Las contraseñas se guardan con **bcrypt** (hash + sal)
- Autenticación con **JWT** (token expira en 2 horas)
- Nunca se devuelve la contraseña en las respuestas
- El servidor no revela si un usuario existe o no

---

## 🛠️ Para desarrollo con recarga automática
```bash
npm run dev
```
(requiere nodemon, ya está en las dependencias)
