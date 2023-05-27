const express = require('express');
//Tuve que instalar "npm i body-parser" porque no me funcionaba el thunder client
const bodyParser = require('body-parser');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors')

//Crear Expres App
const app = express();

//Base Datos
dbConnection();

//CORS
const headers = {
    cors: {
        origin: 'http://127.0.0.1:5173',
        methods: ["GET", "POST"]
    }
}
app.use(cors(headers))

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'))

//Escuchar en puerto 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT)
})