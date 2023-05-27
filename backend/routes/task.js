const express = require('express')
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-token');

router.use(validarJWT)

module.exports = router;