const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports =  function validateAgent(data) {
    let errors = {}

    data.name= !isEmpty(data.name) ? data.name : ''
    data.lastName= !isEmpty(data.lastName) ? data.lastName : ''
    data.phone= !isEmpty(data.phone) ? data.phone : ''
    data.password= !isEmpty(data.password) ? data.password : ''
    data.post= !isEmpty(data.post) ? data.post : ''

    if(!Validator.isLength(data.name, { min: 3, max : 50})){
        errors.name = 'le nom ne peut pas contenir moins de 3 caractères et plus de 50 caractère'
    }
    if(!Validator.isLength(data.lastName, { min: 3, max : 50})){
        errors.lastName = 'le nom ne peut pas contenir moins de 3 caractères et plus de 50 caractère'
    }
    if(!Validator.isLength(data.phone, { min: 8, max: 8})){
        errors.phone = 'le numéro de téléphone ne peut être que 8 caractères'
    }
    if(!Validator.isLength(data.password, { min: 6, max: 20})){
        errors.phone = 'le mot de passe ne peut pas contenir moins de 6 caractères'
    }

    if(Validator.isEmpty(data.name)){
        errors.name= 'le prénom ne peut pas être vide'
    }
    if(Validator.isEmpty(data.lastName)){
        errors.lastName= 'le nom de famille ne peut pas être vide'
    }
    if(Validator.isEmpty(data.phone)){
        errors.phone= 'le numéro de téléphone ne peut pas être vide'
    }
    if(Validator.isEmpty(data.password)){
        errors.password= 'le mot de passe ne peut pas être vide'
    }
    if(Validator.isEmpty(data.post)){
        errors.post= 'le post ne peut pas être vide'
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}