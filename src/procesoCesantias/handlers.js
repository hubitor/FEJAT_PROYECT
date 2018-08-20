'use strict';

exports.cargarPagosCesantias = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('procesoCesantias/cargarPagosCesantias', context, { layout: 'internal_layout' });
}