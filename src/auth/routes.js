'use strict';

const HANDLERS = require('./handlers.js');

module.exports = [{
        method: 'GET',
        path: '/login',
        config: {
            auth: {
                strategy: 'web',
                mode: 'try'
            }
        },
        handler: HANDLERS.loginView
    }, {
        method: 'POST',
        path: '/login',
        config: {
            auth: {
                strategy: 'web',
                mode: 'try'
            }
        },
        handler: HANDLERS.WebCheckLogin
    }, {
        method: 'GET',
        path: '/profile/logout',
        handler: HANDLERS.webLogout
    }
    /*, {
        method: 'GET',
        path: '/register',
        config: { auth: false },
        handler: HANDLERS.registerView
    }*/
    , {
        method: 'GET',
        path: '/rememberPassword',
        config: { auth: false },
        handler: HANDLERS.rememberPassword
    }, {
        method: 'POST',
        path: '/rememberPassword',
        config: { auth: false },
        handler: HANDLERS.rememberPasswordProcess
    }
]