const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports =  function validatePerception(data) {
    let errors = {}

    data.id= !isEmpty(data.id) ? data.id : ''
    data.price= !isEmpty(data.price) ? data.price : ''

    if(Validator.isEmpty(data.id)){
        errors.id= "Veillez choisir la demande du patient "
    }
    if(Validator.isEmpty(data.price)){
        errors.price= "Veillez reseigner le prix"
    }

    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}