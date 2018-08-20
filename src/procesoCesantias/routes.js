'use strict';

const HANDLERS = require('./handlers');

module.exports=[
    {
        method: 'GET',
        path: '/procesoCesantias/cargarPagosCesantias',
        handler: HANDLERS.cargarPagosCesantias
    }
]