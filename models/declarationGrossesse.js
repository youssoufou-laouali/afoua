const mongoose= require('mongoose')
const Schema= mongoose.Schema

const DeclarationGrossesseSchema= new Schema({
    
    date: {
        type: Date,
        default: Date.now
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    nombreMois :{
        type : Number
    },
    mari: {
        type: String
    },
    numSecuriteSociale: {
        type: String
    },
    profession: {
        type: String
    },
    nomEmployeur: {
        type: String
    },
    femme: {
        type: String
    },
    delivree: {
        type: String
    },
    demeure: {
        type: String
    },
   
})

module.exports= DeclarationGrossesse = mongoose.model('declarationgrossesse', DeclarationGrossesseSchema )