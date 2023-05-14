const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Creación servidor de express
const app = express();

// Conexión a base de datos
dbConnection();

app.use(cors());

// Establecer / al public del directorio
app.use( express.static('public') );

// Parseo del body
app.use( express.json() );

// Rutas
// TODO: Auth - Crear, Login, RenewToken
app.use( '/api/auth', require('./routes/auth') );
// TODO: Events - CRUD



// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor en puerto ${ process.env.PORT }`);
});