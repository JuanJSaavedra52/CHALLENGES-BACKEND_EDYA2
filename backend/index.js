const express = require('express');
//Tuve que instalar "npm i body-parser" porque no me funcionaba el thunder client
const bodyParser = require('body-parser');
require('dotenv').config();
const {dbConnection} = require('./database/config')
//Crear Expres App
const app = express();

//Base Datos
dbConnection();

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

//Rutas
app.use('/api/auth', require('./routes/auth'))

//Escuchar en puerto 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT)
})