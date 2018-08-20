const assert = require("assert");
var login = require('../src/auth/handlers');
var normatividad = require('../src/normatividad/handlers');

describe('Test handlers "login"', function () {
    //Pruebas unitarias que validan si existen las funciones utilizadas para el login del usuario
    it('Existe la función "login"', function () {
        assert.equal(typeof login, 'object');
        assert.equal(typeof login.loginView, 'function');
    });
    it('Existe la función "WebCheckLogin"', function () {
        assert.equal(typeof login, 'object');
        assert.equal(typeof login.WebCheckLogin, 'function');
    });
    it('Existe la función "logout"', function () {
        assert.equal(typeof login, 'object');
        assert.equal(typeof login.webLogout, 'function');
    });
    it('Existe la función "rememberPassword"', function () {
        assert.equal(typeof login, 'object');
        assert.equal(typeof login.rememberPassword, 'function');
    });
    it('Existe la función "proceso Recordar Contraseña"', function () {
        assert.equal(typeof login, 'object');
        assert.equal(typeof login.rememberPasswordProcess, 'function');
    });    
});

describe('Test handlers "normatividad"', function () {
    //Pruebas unitarias que validan si existen las funciones utilizadas para cargar la normatividad
    it('Existe la función "normatividad"', function () {
        assert.equal(typeof normatividad, 'object');
        assert.equal(typeof normatividad.normatividad, 'function');
    });    
        
});




