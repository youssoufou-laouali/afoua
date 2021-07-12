const mongoose= require('mongoose')
const Schema= mongoose.Schema

const PediatriqueSchema= new Schema({
    
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
    
    sexe :{
        type : String
    },
    adresse: {
        type: String
    },
    maladieConnue: {
        type: String
    },
    motifConsultation: {
        type: String
    },
    poids: {
        type: String
    },
    taille: {
        type: String
    },
    pc: {
        type: String
    },
    t: {
        type: String
    },
    fr: {
        type: String
    },
    fc: {
        type: String
    },
    sao2: {
        type: String
    },
    ta: {
        type: String
    },
    examenPhysique: {
        type: String
    },
    bilanResultats: {
        type: String
    },
    diagnostic: {
        type: String
    },
    traitement: {
        type: String
    },
    rdv: {
        type: Date
    },
   
})

module.exports= Pediatrique = mongoose.model('pediatrique', PediatriqueSchema )