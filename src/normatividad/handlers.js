'use strict';

exports.normatividad = async function (req, res) {
    let context = {};
    try {
        let tNormas = await this.PGInterssi.query(`
            SELECT *
            FROM tipo_normatividad
            ORDER BY nombre_norma`);
        context.tNormas = tNormas.rows;
        let codigoNorma = tNormas.rows[0];
        if (tNormas.rows == 0) {
            console.log(error);
        } else {
            context.tNormas.unshift({id_tipo_norma: -1, nombre_norma: 'Todos'});
            let id_tipo_norma = req.query.id;
            if (!id_tipo_norma) id_tipo_norma = -1;
            let nombreNorma = null;
            let tConsultaNormas = await this.PGInterssi.query(`
            SELECT nombre_norma, numero_norma, fecha_publicacion, tematica_norma, url_descarga
            FROM normatividad
            WHERE (id_tipo_norma = $1 OR $1 = -1)
            ORDER BY id`, [id_tipo_norma]);
            context.tConsultaNormas = tConsultaNormas.rows;
        }
    } catch (error) {
        console.log(error);
    }
    return res.view('normatividad/normatividad', context);
}