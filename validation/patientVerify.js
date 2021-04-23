const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports =  function validatePatient(data) {
    let errors = {}

    data.phone= !isEmpty(data.phone) ? data.phone : ''

    if(!Validator.isLength(data.phone, { min: 8, max: 8})){
        errors.phone = 'le numéro de téléphone ne peut être que 8 caractères'
    }
    if(Validator.isEmpty(data.phone)){
        errors.phone= 'le numéro de téléphone ne peut pas être vide'
    }   

    return {
        errors,
        isValid: isEmpty(errors)
    }
}