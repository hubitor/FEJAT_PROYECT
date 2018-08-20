'use strict';

exports.crearUsuarios = function(req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('administracion/crearUsuarios', context, { layout: 'internal_layout' });
}
exports.processCreateUsers = async function(req, res) {
    let context = { credentials: req.auth.credentials };
    let formInformation = req.payload;
    console.log(formInformation);
    let typeDocument = formInformation.typeDocument;
    let idAssociated = formInformation.idAssociated;
    let nameAssociated = formInformation.nameAssociated;
    let lastNameAssociated = formInformation.lastNameAssociated;
    let profilelUser = formInformation.profilelUser;
    let email = formInformation.email;
    let username = formInformation.username;
    let password = formInformation.password;
    username = Buffer.from(username, 'base64').toString();
    password = Buffer.from(password, 'base64').toString();
    let hashedPassword = this.BCRYPT.hashSync(password, this.BCRYPT_SALT);
    let userExist;
    let resultUserExists;
    let loginExist;
    let resultLoginExists;
    try {
        userExist = await this.PG.query(`
        SELECT *
        FROM usuario
        WHERE tipo_documento=$1
        AND numero_documento=$2 `, [typeDocument, idAssociated])
        resultUserExists = userExist.rows;
    } catch (error) {
        console.log(`Error obteniendo la información del usuario ${error}`);
    }
    try {
        loginExist = await this.PG.query(`
        SELECT login_usuario
        FROM usuario
        WHERE login_usuario=$1`, [username])
        resultLoginExists = loginExist.rows;
    } catch (error) {
        console.log(`Error obteniendo la información del usuario ${error}`);
    }
    if (resultUserExists.length !== 0) {
        let userExists = `El usuario con tipo y numero de identificación ${typeDocument} ${idAssociated} ya se encuentra registrado.`;
        context.userExists = userExists;
        return res.view('administracion/crearUsuarios', context, { layout: 'internal_layout' });
    } else if (resultLoginExists.length !== 0) {
        let loginExists = `El usuario ${username} ya se encuentra registrado`;
        context.loginExists = loginExists;
        return res.view('administracion/crearUsuarios', context, { layout: 'internal_layout' });
    } else {
        let profile;
        if (profilelUser === 'administrator') {
            profile = 1;
        } else if (profilelUser === 'associated') {
            profile = 2;
        }
        let insertUser;
        let resultInsertUser;
        try {
            insertUser = await this.PG.query(`
            INSERT INTO usuario 
            (tipo_documento, numero_documento, nombres_usuario, apellidos_usuario, perfil_usuario, correo_usuario, login_usuario, password_usuario, estado_usuario, id_rol)
            VALUES 
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [typeDocument, idAssociated, nameAssociated, lastNameAssociated, profile, email, username, hashedPassword, 1, profile]);
            resultInsertUser = insertUser.rows;
            if (resultInsertUser.rows !== 0) {
                let correctInsert = `Se ha creado correctamente el usuario ${username}`;
                context.correctInsert = correctInsert;
                return res.view('partials/resultCreateUser', context, { layout: 'internal_layout' });
            }
        } catch (error) {
            console.log(`Error insertando la información del usuario ${error}`);
        }
    }
}

exports.cambiarContrasena = function(req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('administracion/cambiarContrasena', context, { layout: 'internal_layout' });
}