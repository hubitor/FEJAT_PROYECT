'use strict';

const CREATEUSERS = require('./crearUsuarios/routes');
const MODIFYUSERS = require('./modificarUsuarios/routes');

module.exports = [

    ].concat(CREATEUSERS)
    .concat(MODIFYUSERS)