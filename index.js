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

app.use( '/api/auth', require('./routes/authRoutes') );
app.use( '/api/events', require('./routes/eventsRoutes') );



// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor en puerto ${ process.env.PORT }`);
});