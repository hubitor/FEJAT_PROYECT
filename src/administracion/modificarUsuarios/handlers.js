'use strict';

exports.administrarUsuarios = function(req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('administracion/administrarUsuarios', context, { layout: 'internal_layout' });
}

exports.processSearchUser = async function(req, res) {
    let context = { credentials: req.auth.credentials };
    let formInformation = req.payload;
    let username = formInformation.username;
    username = Buffer.from(username, 'base64').toString();
    let searchUser;
    let resultSearchUser;
    try {
        searchUser = await this.PG.query(`
        SELECT tipo_documento, numero_documento, nombres_usuario, apellidos_usuario, perfil_usuario, correo_usuario, login_usuario, password_usuario,  estado_usuario
        FROM usuario
        WHERE login_usuario=$1`, [username]);
        resultSearchUser = searchUser.rows[0];
    } catch (error) {
        console.log(`Error obteniendo la información del usuario ${error.message}`);
    }
    if (resultSearchUser) {
        let nameUser = resultSearchUser.nombres_usuario;
        let lastNameUser = resultSearchUser.apellidos_usuario;
        let typeDocument = resultSearchUser.tipo_documento;
        let numberDocument = resultSearchUser.numero_documento;
        let profile = parseInt(resultSearchUser.perfil_usuario);
        let email = resultSearchUser.correo_usuario;
        let login = resultSearchUser.login_usuario;
        let password = resultSearchUser.password_usuario;
        let stateUser = parseInt(resultSearchUser.estado_usuario);
        if (typeDocument === 'CC') {
            typeDocument = 'Cedula de Ciudadanía';
        } else {
            typeDocument = 'Cedula de Extranjeria';
        }
        if (profile === 1) {
            profile = 'Administrador';
        } else {
            profile = 'Asociado';
        }
        var check;
        if (stateUser === 1) {
            stateUser = true;
        } else {
            stateUser = '';
        }
        context.resultSearchUser = resultSearchUser;
        context.nameUser = nameUser;
        context.lastNameUser = lastNameUser;
        context.typeDocument = typeDocument;
        context.numberDocument = numberDocument;
        context.profile = profile;
        context.email = email;
        context.login = login;
        context.password = password;
        context.stateUser = stateUser;
        return res.view('administracion/administrarUsuarios', context, { layout: 'internal_layout' });

    } else {
        let userNoExists = `No se encontro información para el usuario ${username}`;
        context.userNoExists = userNoExists;
        return res.view('administracion/administrarUsuarios', context, { layout: 'internal_layout' });
    }
}

exports.updateInformationUser = async function(req, res) {
    let context = { credentials: req.auth.credentials };
    let formInformation = req.payload;
    let nameAssociated = formInformation.nameAssociated;
    let lastNameAssociated = formInformation.lastNameAssociated;
    let email = formInformation.email;
    let stateUser = formInformation.stateUser;
    let login = formInformation.username;
    if (stateUser) {
        stateUser = 1;
    } else {
        stateUser = 0;
    }
    let updateInformation;
    let resultUpdateInformation;
    try {
        updateInformation = await this.PG.query(`
        UPDATE usuario SET nombres_usuario=$1, apellidos_usuario=$2, correo_usuario=$3, estado_usuario=$4
        WHERE  login_usuario=$5`, [nameAssociated, lastNameAssociated, email, stateUser, login]);
        resultUpdateInformation = updateInformation.rows;
        if (resultUpdateInformation.length === 0) {
            let correctUpdate = `Se ha modificado correctamente el usuario ${login}`;
            context.correctUpdate = correctUpdate;
            return res.view('partials/resultUpdateUser', context, { layout: 'internal_layout' });
        }
    } catch (error) {
        console.log(`Error actualizando la información del usuario ${error}`);
        let errorUpdate = `No se pudo actualizar la información del usuario: ${error.message}`;
        context.errorUpdate = errorUpdate;
        return res.view('administracion/administrarUsuarios', context, { layout: 'internal_layout' });
    }
}