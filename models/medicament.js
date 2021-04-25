const mongoose= require('mongoose')
const Schema= mongoose.Schema

const medicamentSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    dosage:{
        type: String,
    },
    quantité:{
        type: String,
    },
    prise: {
        type: String,
    },
    delai : {
        type : String,
    },
})

module.exports= Medicament = mongoose.model('medicament', medicamentSchema )