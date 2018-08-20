'use strict';

const HANDLERS = require('./handlers');
module.exports = [{
    method: 'GET',
    path: '/procesosFondo/solicitarPrestamo',
    handler: HANDLERS.solicitarPrestamo
}, {
    method: 'POST',
    path: '/procesosFondo/procesarSolicitud',
    handler: HANDLERS.processLoan
}]