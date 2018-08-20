'use strict';

exports.solicitarPrestamo = async function(req, res) {
    let context = {
        credentials: req.auth.credentials,
        names: req.auth.credentials.names,
        lastName: req.auth.credentials.lastName,
        typeId: req.auth.credentials.typeId,
        numberId: req.auth.credentials.numberId,
        rolUser: req.auth.credentials.rol
    };
    let rolUser = parseInt(context.rolUser);
    if (rolUser === 2) {
        let resultLoadInformation = await loadInformation(context);
        let typeDocument = resultLoadInformation.typeDocument;
        let numberDocument = resultLoadInformation.numberDocument;
        let nameAssociated = resultLoadInformation.names;
        let lastNameAssociated = resultLoadInformation.lastName;
        context.typeDocument = typeDocument;
        context.numberDocument = numberDocument;
        context.nameAssociated = nameAssociated;
        context.lastNameAssociated = lastNameAssociated;
    } else {
        let visibleFields = true;
        context.visibleFields = visibleFields;
    }
    return res.view('procesosFondo/solicitarPrestamo', context, { layout: 'internal_layout' });
}


exports.processLoan = async function(req, res) {
    let context = {
        credentials: req.auth.credentials,
        names: req.auth.credentials.names,
        lastName: req.auth.credentials.lastName,
        typeId: req.auth.credentials.typeId,
        numberId: req.auth.credentials.numberId
    };
    let formInformation = req.payload;
    let typeDocument = formInformation.typeDocument;
    let idAssociated = formInformation.idAssociated;
    let nameAssociated = formInformation.nameAssociated;
    let lastNameAssociated = formInformation.lastNameAssociated;
    let date = formInformation.date;
    let dues = formInformation.dues;
    let value = formInformation.value;
    let numberAccount = formInformation.numberAccount;
    let loanType = formInformation.loanType;
    let nameDebtor = formInformation.nameDebtor;
    let idDebtor = formInformation.idDebtor;
    let creditCapacity;
    let resultCreditCapacity;
    try {
        creditCapacity = await this.PG.query(`
        SELECT valor_credito_asociado, cuotas_credito_asociado, valor_pendiente_credito_asociado
        FROM estados_cuenta
        WHERE identificacion_asociado=$1`, [idAssociated]);
        resultCreditCapacity = creditCapacity.rows;
    } catch (error) {
        console.log(`Error obteniendo los valores para el asociado: ${error.message}`);
    }
    if (resultCreditCapacity.lenght !== 0) {
        let valueCredit = parseInt(resultCreditCapacity[0].valor_credito_asociado);
        let duesCredit = parseInt(resultCreditCapacity[0].cuotas_credito_asociado);
        let pendingValue = parseInt(resultCreditCapacity[0].valor_pendiente_credito_asociado);
        if (valueCredit !== 0) {
            let percentCredit = valueCredit * 30 / 100;
            if (pendingValue > percentCredit) {
                let messageNoCredit = `Estimado Asociado ${nameAssociated} ${lastNameAssociated}\n Su solicitud de credito no se puede procesar ya que tiene un credito aprobado del cual no se ha pagado mas del 70%`;
                context.messageNoCredit = messageNoCredit;
                return res.view('procesosFondo/solicitarPrestamo', context, { layout: 'internal_layout' });
            }
        } else {

        }
    }





    return res.view('procesosFondo/solicitarPrestamo', context, { layout: 'internal_layout' });

}

let loadInformation = async(context) => {
    let objectView = {}
    let typeDocument = context.typeId;
    if (typeDocument === 'CC') {
        typeDocument = 'Cedula de Ciudadanía';
    } else {
        typeDocument = 'Cedula de Extranjería';
    }
    let numberDocument = context.numberId;
    let names = context.names;
    let lastName = context.lastName;
    objectView = {
        typeDocument,
        numberDocument,
        names,
        lastName
    }
    return objectView;
}