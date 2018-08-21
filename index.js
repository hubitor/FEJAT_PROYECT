'use strict';

//IMPORTS
const Hapi = require('hapi');
const { Pool } = require('pg');
const INERT = require('inert');
const VISION = require('vision');
const YAR = require('yar');
const BCRYPT = require("bcrypt");
const BCRYPT_SALT = 10;
const JWT = require('jsonwebtoken');
const AUTH_COOKIE = require('hapi-auth-cookie');
const PASS_COOKIE = 'HX6Tq9WW1yStE0LrAyGvIUW/i0S4Du7KcNbKcvucm0x7CopmTXIC1ZCwsbakBxud6Bdk9EXSvyX+mRF/jcWz1j69UBKRAi7Jg3oVyYn1SbH0IVQN2lcl9NKYBT+Ip138fR1W144sqiLvC4kv9IcPwavpLB9q8lMX+hP5tE0XsTKfT8PTnGZS061RcnH78t1WZN5gpws285BbmZGBb9uyGyITFhEv5Dl1WTc4XQzIy1oqP/sv0o3IwJ2VafZs8WqNhgc+IX1NOEInt2+IJKbP5CjrkGmO75NrG5qOlzfB/uInpuR1xGYp/BgqAjcfGCWzB8ckhON9hz/d1ax2m+jCww==';
const SKJ = 'mOKgc19RKWG1Y+Pd+gCGIGDpzIVV6RVh12xApXWjZ+DtoKJ97tYo69rZYtwG3D+sCICDZ+AihiBL/Av42dXsxQ+YQPyXLi2AZ1yGgCDXa97z1aaLGdQ4sM5ZRgxf8vIFisd0GCevJ+qPkY/QXeyh1d+MWNBKhi2j2ASXJyGzvJ1oEcy0UlcH4Dy5bydDuVBeBgLsQZfMJGweQy3KTGvQ/HACcGiMALjaMxOahN+/PTcgspbXf/4tDx+Zyz4++wXQ9I2dXIMH60662opTe4SpXmw3843QjQ4wbnUoTi2pgDwWyU47tzmwoI+55L+O+e3peEznzP4LiEpm4mZyPJlbjg==';
const TIME_OUT_SESSION = 30 * 60 * 1000; //30mins
const FS = require('fs');

const port = process.env.PORT || 3000;

//Configuración acceso a base de datos
//postgresql://user:password@urlDatabase:port/database

const PG = new Pool({
    connectionString: 'postgresql://postgres:pgsql@localhost:5432/fejat'
});


//Instancia de servidor
const server = new Hapi.Server({
    port,
    host: '0.0.0.0',
    routes: {
        files: {
            relativeTo: './public'
        }
    }
});
var start = async function() {
    await server.register([INERT, VISION, AUTH_COOKIE]);
    await server.register({
        plugin: YAR,
        options: {
            storeBlank: false,
            cookieOptions: {
                password: PASS_COOKIE,
                isSecure: false
            }
        }
    });

    const cache = server.cache({ segment: 'tokens', expiresIn: TIME_OUT_SESSION });
    server.app.cache = cache;
    server.auth.strategy('web', 'cookie', {
        password: PASS_COOKIE,
        cookie: 'sHapiJTCCIA',
        redirectTo: '/login',
        isSecure: false,
        clearInvalid: true,
        //redirectOnTry: false,
        validateFunc: async(req, session) => {
            const token = await cache.get(session.token);
            const out = {
                valid: !!token
            };
            if (!out.valid && req.path != '/login') {
                req.yar.set('lastPath', req.path);
                return out;
            }
            let dToken = null;
            let isValid = false;
            let exp = token.exp;
            if (exp) {
                if (exp > (new Date().getTime())) {
                    token.exp = new Date().getTime() + TIME_OUT_SESSION;
                    cache.set(session.token, token);
                    try {
                        dToken = JWT.decode(session.token);
                        dToken.tasks = token.tasks;
                        dToken.scope = token.scope;
                        isValid = true;
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    req.cookieAuth.clear();
                    out.valid = false;
                }
            }
            out.credentials = dToken;
            return out;
        }
    });
    server.auth.default('web');

    server.views({
        engines: { hbs: require('handlebars') },
        relativeTo: __dirname,
        path: './views',
        layout: true,
        layoutPath: './views/layout',
        partialsPath: './views/partials',
        helpersPath: './views/helpers'
    });

    server.bind({
        PG: PG,
        BCRYPT: BCRYPT,
        BCRYPT_SALT: BCRYPT_SALT,
        JWT: JWT,
        SKJ: SKJ,
        TIME_OUT_SESSION: TIME_OUT_SESSION,
        FS: FS,
        SERVER_PATH: __dirname
    });

    let module = FS.readdirSync('./src/');
    for (var i = 0; i < module.length; i++) {
        server.route(require('./src/' + module[i] + '/routes'));

    };
    await server.start();
    console.log('Proyecto Fondo empleados Jaime Torres V 1.0.0');
    console.log(`Server running at: ${server.info.uri}`);
}
start();