'use strict';

exports.descargarArchivos = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('procesos/descargarArchivos', context, { layout: 'internal_layout' });
}