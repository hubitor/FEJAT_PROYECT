'use strict';
const HANDLERS = require('./handlers');


module.exports = [
    {
        method: 'GET',
        path: '/procesoPila/cargarArchivoFinanciero',
        handler: HANDLERS.cargarArchivoFinanciero,
    }, {
        method: 'POST',
        path: '/procesoPila/cargarArchivoFinanciero',
        handler: HANDLERS.procesoCargarArchivoFinanciero,
        config: {
            payload: {
                output: 'data',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 52428800
            }
        }
    },{
        method: 'GET',
        path: '/procesoPila/conciliacion',
        handler: HANDLERS.conciliacion
    }
]