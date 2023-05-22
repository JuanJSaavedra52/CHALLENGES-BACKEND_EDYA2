const express = require('express');
const { validationResult } = require('express-validator');

const usuariosCreados = [];
console.log(usuariosCreados);

const registrarUsuario = (req, res = express.request) => {
    const {email, password} = req.body;

    const usuarioExistente = usuariosCreados.find(
        (usuario) => usuario.email === email && usuario.password === password
      );

    if (usuarioExistente) {
        res.json({
            ok: true,
            message: 'Usuario registrado exitosamente',
            email,
            password,
        });
    } else {
        res.status(400).json({
            ok: false,
            message: 'Email y/o contraseña incorrectos'
        })
    }
};

const crearUsuario = (req, res = express.request) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    usuariosCreados.push({email, password});

    res.status(200).json({
        ok: true,
        name, email, password
    })
}

const loginUsuario = (req, res = express.request) => {
    res.json({
        ok: true,
    })
}

const revalidarToken = (req, res = express.request) => {
    res.json({
        ok: true
    })
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken,
    registrarUsuario
}