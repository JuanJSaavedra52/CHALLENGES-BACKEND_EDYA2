const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken, registrarUsuario } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-token');

/*router.post('/register',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password').isLength({ min: 6 }),
        validarCampos
    ],
    registrarUsuario)*/

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario)

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario)

router.get('/renew', validarJWT, revalidarToken)

module.exports = router;