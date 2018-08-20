'use strict';

exports.crearUsuarios = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('administracion/crearUsuarios', context, { layout: 'internal_layout' });
}

exports.administrarUsuarios = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('administracion/administrarUsuarios', context, { layout: 'internal_layout' });
}

exports.cambiarContrasena = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('administracion/cambiarContrasena', context, { layout: 'internal_layout' });
}