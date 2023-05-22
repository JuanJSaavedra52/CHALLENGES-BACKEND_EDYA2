const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//Crear Expres App
const app = express();

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