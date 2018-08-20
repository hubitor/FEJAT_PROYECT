const JOI = require('joi');

exports.fileJoiSchemaFileName = JOI.object().keys({
    1: JOI.string().regex(/^\d{4}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/).label('La fecha tiene un formato invalido AAAA-MM-DD')    
});