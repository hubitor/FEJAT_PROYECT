'use strict';

const HANDLERS = require('./handlers');

module.exports = [{
    method: 'GET',
    path: '/administracion/administrarUsuarios',
    handler: HANDLERS.administrarUsuarios
}, {
    method: 'POST',
    path: '/administracion/buscarUsuario',
    handler: HANDLERS.processSearchUser
}, {
    method: 'POST',
    path: '/administracion/actualizarInformacionUsuario',
    handler: HANDLERS.updateInformationUser
}]