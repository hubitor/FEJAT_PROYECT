'use strict';
let fs = require('fs');
const READLINE = require('linebyline');
const SCHEMAS = require('./schema');
const JOI = require('joi');
let resultValidation = new Array();
const schemaArch = {
    "registroUno": [{
        "campo": [1, 2, 3, 4, 5, 6],
        "long": [1, 8, 3, 15, 22, 71],
        "posicion": [{
            "inicial": [1, 2, 10, 13, 28, 50],
            "final": [1, 9, 12, 27, 49, 120]
        }]
    }]
}


// funcion GET que muestra la vista cargarArchivoFinanciero.hbs
exports.cargarArchivoFinanciero = async function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });
}

//funcion POST que se encarga de realizar los procesos
exports.procesoCargarArchivoFinanciero = async function (req, res) {
    let codeBank = await this.PG.query(`
    SELECT bpse_codigo 
    FROM bancos_pse 
    WHERE bse_estado ='1'`);

    let context = {
        credentials: req.auth.credentials,
        admin: req.auth.credentials.admin
    }
    let formInformation = req.payload;
    //Esta condicion valida si el archivo no contiene información y retorna un error a la vista
    if (Object.keys(formInformation.uploadedfile).length === 0) {
        let sinInformacion = req.yar.set('sinInformacion', { key: `El archivo cargado ${fileName} no contiene información por favor seleccione un nuevo archivo` });
        context.sinInformacion = sinInformacion.key;
        return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });
    }
    let fileName = formInformation.filename;
    let validName = nameValidation(fileName, codeBank, context.admin);



    return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });



}

let nameValidation = (fileName, codeBank, userAdmni) => {
    let fileSchemaJoiFileName = JOI.object().keys({
        nombre: JOI.string().regex(/^\d{4}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/).label('La fecha tiene un formato invalido AAAA-MM-DD')
    })
    fileName = fileName.substring(0, fileName.length - 4).split('_');
    
   

}






exports.conciliacion = function (req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('procesoPila/conciliacion', context, { layout: 'internal_layout' });
}





