'use strict';

const HANDLERS = require('./handlers');

//Definicion de rutas
module.exports =  [{
    method: 'GET',
    path: '/public/{param*}',
    config: {auth: false},
    handler: {
        directory: {
            path: '..',
        }
    }
},{
    method: 'GET',
    path: '/hello/{name}',
    handler: HANDLERS.hello
}];