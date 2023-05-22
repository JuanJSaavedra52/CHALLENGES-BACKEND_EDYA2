const express = require('express');
const { validationResult } = require('express-validator');

const usuariosCreados = [];
const usuariosRegistrados = [];

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
    usuariosRegistrados.push({email, password});
};

const crearUsuario = (req, res = express.request) => {
    const { name, email, password } = req.body;

    usuariosCreados.push({email, password});

    res.status(200).json({
        ok: true,
        name, email, password
    })
}

const loginUsuario = (req, res = express.request) => {
    const {email, password} = req.body;

    const usuarioEsta = usuariosRegistrados.find(
        (usuario) => usuario.email === email && usuario.password === password
      );

    if (usuarioEsta) {
        res.json({
            ok: true,
            message: 'Usuario logueado exitosamente',
            email,
            password,
        });
    } else {
        res.status(400).json({
            ok: false,
            message: 'Email y/o contraseña incorrectos'
        })
    }

    res.json({
        ok: true,
        email, password
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