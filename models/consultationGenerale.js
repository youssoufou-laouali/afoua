const mongoose= require('mongoose')
const Schema= mongoose.Schema

const GeneraleSchema= new Schema({
    
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
    fonction: {
        type: String
    },
    motifConsultation: {
        type: String
    },
    medical: {
        type: String
    },
    chirurgical: {
        type: String
    },
    gynecoObstetrique: {
        type: String
    },
    allergies: {
        type: String
    },
    familiaux: {
        type: String
    },
    automedication: {
        type: String
    },
    hospitalisationRecente: {
        type: String
    },
    t: {
        type: String
    },
    fc: {
        type: String
    },
    spo2: {
        type: String
    },
    ta: {
        type: String
    },
    signeGenereaux: {
        type: String
    },
    examenPhysique: {
        type: String
    },
    soinsRecuUrgence: {
        type: String
    },
    examenResultat: {
        type: String
    },
    ordonnanceHospitalisation: {
        type: String
    },
   
})

module.exports= Generale = mongoose.model('generale', GeneraleSchema )