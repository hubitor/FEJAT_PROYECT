'use strict';

const HANDLERS = require('./handlers');

//Definicion de rutas
module.exports = [
    {
        method: 'GET',
        path: '/',
        config: { auth: false },
        handler: HANDLERS.root
    }, {
        method: 'GET',
        path: '/soporte',
        config: { auth: false },
        handler: HANDLERS.soporte
    }, {
        method: 'GET',
        path: '/principal',
        handler: HANDLERS.principal
    }, {
        method: 'GET',
        path: '/users',
        handler: HANDLERS.getUsers
    }, {
        method: 'GET',
        path: '/user/{userId}',
        handler: HANDLERS.getUserByUserId
    },

]