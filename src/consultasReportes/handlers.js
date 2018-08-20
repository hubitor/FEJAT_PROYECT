'use strict';

exports.reportesPila = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('consultasReportes/reportesPila', context, { layout: 'internal_layout' });
}
exports.reportesCesantias = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('consultasReportes/reportesCesantias', context, { layout: 'internal_layout' });
}