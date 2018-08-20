'use strict';

const HANDLERS = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/procesos/descargarArchivos',
        handler: HANDLERS.descargarArchivos
    }
]