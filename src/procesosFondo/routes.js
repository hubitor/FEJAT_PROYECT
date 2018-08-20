'use strict';

const HANDLERS = require('./handlers');
const LOANAPPLICATION = require('./solicitarPrestamo/routes');

module.exports = [].concat(LOANAPPLICATION)