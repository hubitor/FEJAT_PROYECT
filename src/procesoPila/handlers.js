'use strict';
let fs = require('fs');
const JOI = require('joi');
const READLINE = require('linebyline');
let campoSecuencia;
const PATH = "/public/tmp/archivosTemporales/"
const INVALID_LONG_NAME = 1;
const INVALID_ADMIN = 2;
const INVALID_BANK = 3;
const INVALID_DATE = 4;
const INVALID_FILE = 5;
const TIPO_REGISTRO_UNO = "1";
const TIPO_REGISTRO_CINCO = "5";
const TIPO_REGISTRO_SEIS = "6";
const TIPO_REGISTRO_SIETE = "7";
const TIPO_REGISTRO_OCHO = "8";
const TIPO_REGISTRO_NUEVE = "9";
const REGISTER_LENGTH = 120;
let rl;

// funcion GET que muestra la vista cargarArchivoFinanciero.hbs
exports.cargarArchivoFinanciero = async function(req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });
}

//funcion POST que se encarga de realizar los procesos
exports.procesoCargarArchivoFinanciero = async function(req, res) {
    campoSecuencia = 1;
    let context = {
        credentials: req.auth.credentials,
        admin: req.auth.credentials.admin
    };
    let correctNameValidation = false;
    let adminUser = context.admin;
    let formUploadFile = req.payload;
    let fileName = formUploadFile.filename;
    let fileContent = formUploadFile.uploadedfile;
    let public_tmp_path = this.SERVER_PATH + "/public/tmp";
    let fileValidationPath = public_tmp_path + "/archivosTemporales"
    let dateValidationPath = fileValidationPath + "/" + await formatDate(new Date());
    if (fs.existsSync(public_tmp_path)) {
        rmDir(public_tmp_path);
    }
    fs.mkdirSync(public_tmp_path); //this function create route for the temporal files
    fs.mkdirSync(fileValidationPath);
    fs.mkdirSync(dateValidationPath);
    fs.writeFileSync(dateValidationPath + "/" + fileName, fileContent); //Almacena Archivo
    if (Object.keys(fileContent).length === 0) {
        let sinInformacion = req.yar.set('sinInformacion', { key: `El archivo cargado ${fileName} no contiene información por favor seleccione un nuevo archivo` });
        context.sinInformacion = sinInformacion.key;
        return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });
    } else if (formUploadFile.corregirSecuenciaArchivo) {
        rl = READLINE(dateValidationPath + "/" + fileName);
        let fileObj = new Object();
        context.rutaDescarga = await new Promise(resolve => {
            rl.on('line', async function(line) {
                    let tipoRegistro = line.substr(0, 1);
                    let newFileName = fileName.substr(0, fileName.length - 4) + "_1.txt";
                    newFileName = newFileName.substr(0, newFileName.length - 6) + '.txt';
                    let logger = fs.createWriteStream(dateValidationPath + "/" + newFileName, {
                        flags: 'a'
                    });
                    if (tipoRegistro !== "6") {
                        logger.write(line + '\n');
                    } else {
                        line = await corregirSecuencia(line);
                        logger.write(line + '\n');
                    }
                    resolve(PATH + await formatDate(new Date()) + "/" + newFileName);
                    logger.end();
                })
                .on('error', function(e) {
                    console.log("Error: " + e);
                });
        });
        context.nombreArchivo = fileName;
        context.confirmacionCorreccion = "Archivo corregido correctamente.";
        return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });
    } else {
        if (correctNameValidation === false) {
            rl = READLINE(dateValidationPath + "/" + fileName);
            let date = await new Promise(resolve => {
                rl.on('line', async function(line) {
                        let tipoRegistro = line.substr(0, 1);
                        if (tipoRegistro === "1") {
                            let dateFile = line.substr(1, 8);
                            resolve(dateFile);
                        }
                    })
                    .on('error', function(e) {
                        console.log("Error: " + e);
                    });
            });
            fileName = fileName.substr(0, fileName.length - 4);
            let errorId;
            let errorName = new Array;
            let nameArray = fileName.split('_');
            let bank = '1' + nameArray[2];
            let dbCodeBank;

            if (nameArray.length !== 4) {
                errorId = INVALID_LONG_NAME;
                errorName.push(errorId);
            }
            if (adminUser !== nameArray[1]) {
                errorId = INVALID_ADMIN;
                errorName.push(errorId);
            }
            try {
                dbCodeBank = await this.PG.query(`
            SELECT bancos1.bpse_codigo
            FROM bancos_pse AS bancos1,  
            bcos_pse_cenit AS bancos2
            WHERE (bancos2.codigo_transito:: text) = bancos1.bpse_codigo
            AND bancos1.bpse_codigo=$1`, [bank]);
                if (dbCodeBank.rowCount === 0) {
                    errorId = INVALID_BANK;
                    errorName.push(errorId);
                }
            } catch (error) {
                console.log('Error realizando la consulta del banco, ', error);
            }
            let codeBank = dbCodeBank.rows[0];
            if (nameArray[3] !== 'F') {
                errorId = INVALID_FILE;
                errorName.push(errorId);
            }
            if (nameArray[0] !== date) {
                errorId = INVALID_DATE;
                errorName.push(errorId);
            }
            if (errorName.length !== 0) {
                context.errorsNameFile = responseErrorsName(errorName, nameArray, adminUser, date, codeBank);
                return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });
            }
            correctNameValidation = true;
        }
        if (correctNameValidation === true) {
            context.errorStructureFile = await responseErrorsFile(dateValidationPath, fileName + '.txt'.toUpperCase());
            return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });
        } else {
            return res.view('procesoPila/cargarArchivoFinanciero', context, { layout: 'internal_layout' });
        }
    }
}





//function to format an especific
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
}
//Function to delete local path if exist
var rmDir = function(dirPath) {
    try { var files = fs.readdirSync(dirPath); } catch (e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    fs.rmdirSync(dirPath);
    //console.log(`El directorio ${dirPath} fue borrado correctamente`);
};

var corregirSecuencia = async function(line) {
    try {
        let numeroSecuencia = secuenciaArchivo();
        line = line.substr(0, 94) + numeroSecuencia + line.substr(101, line.length);
        campoSecuencia++;
    } catch (error) {
        console.log(error);
    }
    return line;
}

function secuenciaArchivo() {
    let aux = campoSecuencia.toString().length;
    let secArch = campoSecuencia.toString();
    switch (aux) {
        case 1:
            secArch = "00000" + secArch;
            break;
        case 2:
            secArch = "0000" + secArch;
            break;
        case 3:
            secArch = "000" + secArch;
            break;
        case 4:
            secArch = "00" + secArch;
            break;
        case 5:
            secArch = "0" + secArch;
            break;
        case 6:
            secArch;
            break;
    }
    return secArch;
}
//This is a function to input into an array the errors will be in the name 
let responseErrorsName = (errorName, nameArray, adminUser, date) => {
    let errorsArray = new Array;
    for (let i = 0; i < errorName.length; i++) {
        let errorsObject = new Object;
        switch (errorName[i]) {
            case 1:
                errorsObject.description = 'Longitud del archivo invalida';
                break;
            case 2:
                errorsObject.description = 'Administradora del nombre del archivo diferente a la del usuario';
                errorsObject.valueFound = nameArray[1];
                errorsObject.valueExpected = adminUser;

                break;
            case 3:
                errorsObject.description = 'El código del banco en el nombre del archivo no existe';
                errorsObject.valueFound = nameArray[2];
                errorsObject.valueExpected = 'Código de banco valido';

                break;
            case 4:
                errorsObject.description = 'Fecha del archivo no coincide con la fecha del registro 1';
                errorsObject.valueFound = nameArray[0];
                errorsObject.valueExpected = date;

                break;
            case 5:
                errorsObject.description = 'Tipo de archivo invalido';
                errorsObject.valueFound = nameArray[3];
                errorsObject.valueExpected = 'F';
                break;
        }
        errorsArray.push(errorsObject);
    }
    return errorsArray;
}

let responseErrorsFile = async(dateValidationPath, fileName) => {
    let fileJson = {
        "registro1": '',
        "registro5": [],
        "registro6": [],
        "registro8": [],
        "registro9": '',
        "registroInvalido": []
    };
    let errors = [];
    let errorsobject = {};
    rl = READLINE(dateValidationPath + "/" + fileName);
    let registros5 = 1;
    let registros6 = 1;
    let registros8 = 1;
    let tipoRegistro;
    let responseFile = await new Promise(resolve => {
        rl.on('line', async function(line) {
                errorsobject = new Object;
                let lineByLine = line.split('\n').toString();
                tipoRegistro = lineByLine.substr(0, 1);
                if (tipoRegistro == "1") {
                    fileJson.registro1 = lineByLine;
                    errors = await validateRegisterOne(fileJson, errorsobject, errors, tipoRegistro);
                } else if (tipoRegistro == "5") {
                    let registroT5 = {};
                    registroT5[registros5] = lineByLine;
                    fileJson['registro5'].push(registroT5);
                    registros5++;
                } else if (tipoRegistro == "6") {
                    let registroT6 = {};
                    registroT6[registros6] = lineByLine;
                    fileJson['registro6'].push(registroT6);
                    registros6++;
                } else if (tipoRegistro == "8") {
                    let registroT8 = {};
                    registroT8[registros8] = lineByLine;
                    fileJson['registro8'].push(registroT8);
                    registros8++;
                } else if (tipoRegistro == "9") {
                    fileJson.registro9 = lineByLine;
                } else {
                    fileJson.registroInvalido = lineByLine;
                }
                resolve(errors);
            })
            .on('error', function(e) {
                console.log("Error: " + e);
            });
    });
    return responseFile;
}
let validateRegisterOne = (fileJson, errorsobject, errors, tipoRegistro) => {
    let date = fileJson.registro1.substr(1, 8);
    let codeBank = parseInt(fileJson.registro1.substr(9, 3));
    if (codeBank.length < 2) {
        codeBank
    }
    let nitAdmin = fileJson.registro1.substr(12, 15);
    let nameAdmin = fileJson.registro1.substr(27, 22);
    let reserved = fileJson.registro1.substr(27, 22);
    let structureValidationJoi = JOI.object().keys({
        1: JOI.string().regex(/^[1]{1}$/).label('El valor del registro tipo uno debe ser 1'), //1
        2: JOI.string().regex(/^\d{4}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/).required().label('Formato de fecha invalido debe ser AAAAMMDD'),
        3: JOI.number().max(4).required().label('Codigo de banco no valido'),
        4: JOI.number().max(3).required().label('Codigo de banco no valido'),
        5: JOI.number().max(3).required().label('Codigo de banco no valido'),
        6: JOI.number().max(3).required().label('Codigo de banco no valido'),
    })

    console.log(structureValidationJoi.validate({
        1: tipoRegistro,
        2: date,
        3: codeBank,
        4: codeBank,
        5: codeBank,
        6: codeBank,
    }))

















}

// Function conciliación
exports.conciliacion = function(req, res) {
    let context = { credentials: req.auth.credentials };
    return res.view('procesoPila/conciliacion', context, { layout: 'internal_layout' });
}