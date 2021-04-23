const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports =  function validateAccueil(data) {
    let errors = {}

    data.demande= !isEmpty(data.demande) ? data.demande : ''
    data.patient= !isEmpty(data.patient) ? data.patient : ''
    data.agentConsultant= !isEmpty(data.demande) ? data.agentConsultant : ''

    if(Validator.isEmpty(data.demande)){
        errors.demande= "Determiner le besoin du patient"
    }
    if(Validator.isEmpty(data.patient)){
        errors.patient= "Identifier le patient"
    }
    if(Validator.isEmpty(data.agentConsultant)){
        errors.agentConsultant= "Determiner l'agent consultant le patient"
    }

    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}