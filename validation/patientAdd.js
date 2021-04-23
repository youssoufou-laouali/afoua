const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports =  function validateAgentUpdate(data) {
    let errors = {}

    data.name= !isEmpty(data.name) ? data.name : ''
    data.lastName= !isEmpty(data.lastName) ? data.lastName : ''
    data.phone= !isEmpty(data.phone) ? data.phone : ''
    data.dateDeNaissance= !isEmpty(data.dateDeNaissance) ? data.dateDeNaissance : ''

    if(!Validator.isLength(data.name, { min: 3, max : 50})){
        errors.name = 'le nom ne peut pas contenir moins de 3 caractères et plus de 50 caractère'
    }
    if(!Validator.isLength(data.lastName, { min: 3, max : 50})){
        errors.lastName = 'le nom ne peut pas contenir moins de 3 caractères et plus de 50 caractère'
    }
    if(!Validator.isLength(data.phone, { min: 8, max: 8})){
        errors.phone = 'le numéro de téléphone ne peut être que 6 caractères'
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
    if(Validator.isEmpty(data.dateDeNaissance)){
        errors.dateDeNaissance= 'Veillez ajouter votre date de Naissance'
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}