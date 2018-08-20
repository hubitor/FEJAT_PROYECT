'use strict';

exports.root = function (req, res) {
    return res.view('general/home');
}
exports.soporte = function (req, res) {
    return res.view('general/soporte');
}

exports.principal = function (req, res) {
    let context = { credentials: req.auth.credentials };    
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let minutes = date.getMinutes();
    if (month < 10) {
        month = month + 1;
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    context.date = `${date.getFullYear()}/${month}/${day} a las ${date.getHours()}:${minutes}`;
    return res.view('general/principal', context, { layout: 'internal_layout' });
}

exports.getUsers = async function (req, res) {
    let q = {
        text: 'SELECT * FROM users'
    };

    try {
        let users = await this.PG.query(q);
        return users.rows;
    } catch (error) {
        return error;
    }
}
exports.getUserByUserId = async function (req, res) {
    let q = {
        text: 'SELECT * FROM users WHERE id = $1 OR id = $2',
        values: [req.params.userId,
        req.query.id2]
    };

    try {
        let user = await this.PG.query(q);
        return user.rows;
    } catch (error) {
        return error;
    }
}