'use strict';

exports.cambiarContrasena = function(req, res) {
    let context = {
        credentials: req.auth.credentials,
        username: req.auth.credentials.username
    };
    console.log(context.username);
    return res.view('profile/cambiarContrasena', context, { layout: 'internal_layout' });
}

exports.processChangePassword = async function(req, res) {
    let context = {
        credentials: req.auth.credentials,
        username: req.auth.credentials.username
    };
    let formInformation = req.payload;
    let oldPassword = formInformation.oldPassword;
    let confirmNewPassword = formInformation.confirmNewPassword;
    oldPassword = Buffer.from(oldPassword, 'base64').toString();
    let passwordDB;
    let resultPasswordDB;
    let passOk;
    try {
        passwordDB = await this.PG.query(`
        SELECT password_usuario
        FROM usuario
        WHERE login_usuario=$1`, [context.username]);
        resultPasswordDB = passwordDB.rows[0];
    } catch (error) {
        console.log(`Error obteniendo la contraseña del usuario, ${error.message}`);
        context.error = error.message;
        return res.view('profile/cambiarContrasena', context, { layout: 'internal_layout' });
    }
    passOk = await this.BCRYPT.compare(oldPassword, resultPasswordDB.password_usuario);
    if (passOk) {
        confirmNewPassword = Buffer.from(confirmNewPassword, 'base64').toString();
        let hashedPassword = this.BCRYPT.hashSync(confirmNewPassword, this.BCRYPT_SALT);
        let updatePassword;
        let resultUpdatePassword;
        try {
            updatePassword = await this.PG.query(`
            UPDATE usuario 
            SET password_usuario =$1 
            WHERE login_usuario=$2`, [hashedPassword, context.username]);
            resultUpdatePassword = updatePassword.rowCount;
        } catch (error) {
            console.log(`Error actualizando la contraseña del usuario, ${error.message}`);
            context.error = error.message;
            return res.view('profile/cambiarContrasena', context, { layout: 'internal_layout' });
        }
        if (resultUpdatePassword) {
            let correctUpdate = `Se actualizo la contraseña de forma correcta para el usuario ${context.username}`;
            context.correctUpdate = correctUpdate;
            return res.view('partials/resultUpdatePassword', context, { layout: 'internal_layout' });
        }
    } else {
        let incorrectPassword = `La contraseña anterior no es correcta`
        context.incorrectPassword = incorrectPassword;
        return res.view('profile/cambiarContrasena', context, { layout: 'internal_layout' });
    }
}