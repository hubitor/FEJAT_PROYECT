'use strict';

exports.cambiarContrasena = function(req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('profile/cambiarContrasena', context, { layout: 'internal_layout' });
}