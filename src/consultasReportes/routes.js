'use strict';

const HANDLERS = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/consultasReportes/reportesPila',
        handler: HANDLERS.reportesPila
    }, {
        method: 'GET',
        path: '/consultasReportes/reportesCesantias',
        handler: HANDLERS.reportesCesantias
    }
]