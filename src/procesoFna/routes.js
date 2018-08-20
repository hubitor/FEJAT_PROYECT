'use strict';

const HANDLERS = require('./handlers');

module.exports=[
    {
        method: 'GET',
        path: '/procesoFna/aportantesNoRegistrados',
        handler: HANDLERS.aportantesNoRegistrados
    }
]