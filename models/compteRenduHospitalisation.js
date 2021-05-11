const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CompteRenduHospitalisationSchema= new Schema({
    
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
    age: {
        type: Number,
    },
    sexe:{
        type: String
    },
    motifHospitalisation:{
        type: String
    },
    debutHospitalisation:{
        type: Date
    },
    finHospitalisation:{
        type: Date
    },
    personnels:{
        
        medicale:{
            type: String
        },

        chururgical:{
            type: String
        },
        
        gynecoObstretrique:{
            type: String
        },
    },
    familiers:{
        type: String
    },
    examenEntree:{
        type: String
    },
    t:{
        type: String
    },
    ta:{
        type: String
    },
    poids:{
        type: Number
    },
    taille:{
        type: Number
    },
    etatGeneral:{
        type: String
    },
    coeur:{
        type: String
    },
    poumons:{
        type: String
    },
    abd:{
        type: String
    },
    orl:{
        type: String
    },
    autresApp:{
        type: String
    },
    examenDemandes:{
        type: String
    },
    diagnosticRetenu:{
        type: String
    },
    conduiteTenir:{
        type: String
    },
    evolution:{
        type: String
    },
   
})

module.exports= CompteRenduHospitalisation = mongoose.model('compterenduhospitalisation', CompteRenduHospitalisationSchema )