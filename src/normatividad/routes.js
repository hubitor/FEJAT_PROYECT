'use strict';

const HANDLERS = require('./handlers.js');

module.exports = [{
    method: 'GET',
    path: '/normatividad',
    config: { auth: false },
    handler: HANDLERS.normatividad
}]