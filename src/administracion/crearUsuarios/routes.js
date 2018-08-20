'use strict';

const HANDLERS = require('./handlers');

module.exports = [{
    method: 'GET',
    path: '/administracion/crearUsuarios',
    handler: HANDLERS.crearUsuarios
}, {
    method: 'POST',
    path: '/administracion/crearUsuarios',
    handler: HANDLERS.processCreateUsers
}]