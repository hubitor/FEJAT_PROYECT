'use strict';

exports.aportantesNoRegistrados = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('procesoFna/aportantesNoRegistrados', context, { layout: 'internal_layout' });
}