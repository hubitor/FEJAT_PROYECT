'use strict';

const CAPTCHA = require('svg-captcha');
const NODE_MAILER = require('nodemailer');
const HBS = require('handlebars');
const BCRYPT = require('bcrypt');

const JOI = require('joi');
const schema = JOI.object().keys({
    username: JOI.string().alphanum().min(3).max(30).required(),
    name: JOI.string().regex(/^[a-zA-Z áéíóúñ]{3,30}$/),
    email: JOI.string().email(),
    password: JOI.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});

exports.loginView = function(req, res) {
    let context = {};
    let error = req.yar.get('error');
    if (error) context.error = error.key;
    req.yar.clear('error');
    let captcha = CAPTCHA.create({
        size: 6,
        noise: 3
    });
    context.captcha = captcha.data;
    req.yar.set('captcha', { key: captcha.text });
    return res.view('auth/login', context);
}

exports.WebCheckLogin = async function(req, res) {
    try {
        let form = req.payload;
        // REJECT IF HAVE CREDENTIALS
        if (req.auth.isAuthenticated) {
            return res.redirect('/');
        }
        // CAPTCHA VALIDATION
        /*let captchaOri = req.yar.get('captcha').key;
        if (captchaOri != form.captcha & !process.env.NODE_CAPTCHA_OFF) {
            req.yar.set('error', { key: 'No coincide el código captcha' });
            return res.redirect('/login');
        }
        req.yar.clear('captcha');*/
        // UNHASH FORM
        form.username = Buffer.from(form.username, 'base64').toString();
        form.password = Buffer.from(form.password, 'base64').toString();
        // CHECK IF USERNAME EXIST
        //let dbUser = await req.db.getUserByName(form.username); // <<== QUERY DE BUSQUEDA DE USUARIO POR NOMBRE
        let dbUser = await this.PG.query(`
            SELECT *
            FROM usuario
            WHERE login_usuario = $1`, [form.username]);
        if (dbUser.rowCount == 0) {
            req.yar.set('error', { key: 'Nombre de usuario o contraseña errada' });
            return res.redirect('/login');
        } else dbUser = dbUser.rows[0];
        if (dbUser.estado_usuario === "0") {
            req.yar.set('error', { key: 'El usuario esta inactivo para acceder al sistema' });
            return res.redirect('/login');
        }
        // CHECK IF PASSWORD IS CORRECT
        let passOk = await this.BCRYPT.compare(form.password, dbUser.password_usuario);
        if (passOk) {
            // PREPARE CREDENTIALS
            let session = {
                    valid: true, // this will be set to false when the person logs out
                    id: dbUser.id_usuario,
                    name: dbUser.nombres_usuario + " " + dbUser.apellidos_usuario,
                    username: dbUser.login_usuario,
                    rol: dbUser.id_rol,
                    names: dbUser.nombres_usuario,
                    lastName: dbUser.apellidos_usuario,
                    typeId: dbUser.tipo_documento,
                    numberId: dbUser.numero_documento
                }
                // MENU CONSTRUCTION
            let { tasks, scope } = await buildMenu(this.PG, req, session.rol);
            // TOKEN CREATION AND REGISTRATION
            let token = this.JWT.sign(session, this.SKJ);
            await req.server.app.cache.set(token, { username: session.username, exp: new Date().getTime() + this.TIME_OUT_SESSION, tasks: tasks, scope: scope }, 0);
            req.cookieAuth.set({ token });
            req.auth.isAuthenticated = true;
            // REDIRECT TO LAST PAGE PATH
            let lastPath = req.yar.get('lastPath');
            if (lastPath) {
                req.yar.clear('lastPath');
                //console.log(lastPath);
                return res.redirect(lastPath);
            } else {
                return res.redirect('/principal');
            }
        } else {
            req.yar.set('error', { key: 'Nombre de usuario o contraseña errada' });
            return res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/login'); // SOMETHING FAILED
    }
}

async function buildMenu(db, req, rol) { // FIXME: Arreglar primero
    let q = {
        text: `
            SELECT
                COALESCE(ml3.path_menu, '') || COALESCE(ml2.path_menu, '') || COALESCE(ml1.path_menu, '') || tk.path_tarea AS full_path,
                COALESCE(ml3.nombre_menu || '.', '') || COALESCE(ml2.nombre_menu || '.', '') || COALESCE(ml1.nombre_menu || '.', '') || tk.nombre_tarea AS full_name
            FROM tarea AS tk
            INNER JOIN rol_tarea AS rt
                ON rt.id_tarea = tk.id_tarea
                AND rt.id_rol = $1
            LEFT JOIN menu AS ml1
                ON ml1.id_menu = tk.id_menu
            LEFT JOIN menu AS ml2
                ON ml2.id_menu = ml1.menu_padre
            LEFT JOIN menu AS ml3
                ON ml3.id_menu = ml2.menu_padre;`,
        values: [rol]
    };
    let dbTasks = await db.query(q);
    let tasks = {
        menus: [],
        profile: []
    }
    let scope = [];
    for (let i = 0; i < dbTasks.rows.length; i++) {
        scope.push(dbTasks.rows[i].full_path);
        let struct = dbTasks.rows[i].full_name.split('.');
        if (struct[0] != 'Profile') {
            pushTask(tasks.menus, dbTasks.rows[i], struct);
        } else {
            pushTask(tasks.profile, dbTasks.rows[i], struct.slice(1));
        }
    }
    //console.log(JSON.stringify(tasks));
    return { tasks, scope };
}

function pushTask(menuList, task, pathArray) { // FIXME: Arreglar primero
    if (pathArray.length > 1) {
        let subIdx = menuList.findIndex(element => element.name == pathArray[0]);
        if (subIdx < 0) {
            menuList.push({
                name: pathArray[0],
                subMenus: []
            });
            subIdx = menuList.length - 1;
        }
        pushTask(menuList[subIdx].subMenus, task, pathArray.slice(1));
    } else {
        menuList.push({
            name: pathArray[0],
            path: task.full_path
        });
    }
}

exports.webLogout = (req, res) => {
    req.cookieAuth.clear();
    return res.redirect('/');
};

// exports.registerView = function(req, res) {
//     return res.view('auth/register');
// }

// exports.register = async function(req, res) {
//     let form = req.payload;
//     //let validation = JOI.validate(form, schema);
//     //if (validation.error) return res.view('register/register', {error: validation});
//     form.rol = 3;
//     form.password = await this.BCRYPT.hash(form.password, this.BCRYPT_SALT);
//     try {
//         //await req.db.createUser(form); // FIXME: Arreglar primero
//         return res.view('auth/register', { valid: true });
//     } catch (err) {
//         console.log(err);
//         return res.view('auth/register', { err: err });
//     }
// }

exports.rememberPassword = async function(req, res) {
    return res.view('auth/rememberPassword', { valid: true });
}

//THIS FUNCTION IS USED TO REMEMBER THE PASSWORD TO THE USER THROUGH EMAIL
exports.rememberPasswordProcess = async function(req, res) {
    let context = {};
    try {
        let formRememberPass = req.payload;
        let dbUserExist = await this.PG.query(`
            SELECT * FROM usuario 
            WHERE (login_usuario= $1 or correo_usuario=$1);`, [formRememberPass.username]);
        if (dbUserExist.rows == 0) {
            let errorUser = req.yar.set('errorUser', { key: 'El usuario no esta registrado' });
            context.errorUser = errorUser.key;
            return res.view('auth/rememberPassword', context);
        } else {
            let claveTemporal = await makeId();
            console.log(claveTemporal);
            return res.view('auth/login', context);
        }
    } catch (error) {
        console.log(error);
    }
}