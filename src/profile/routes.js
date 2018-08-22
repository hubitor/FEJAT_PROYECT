'use strict';

const HANDLERS = require('./handlers');

module.exports = [{
    method: 'GET',
    path: '/profile/cambiarContrasena',
    handler: HANDLERS.cambiarContrasena
}, {
    method: 'POST',
    path: '/profile/procesoCambioContrasena',
    handler: HANDLERS.processChangePassword
}]