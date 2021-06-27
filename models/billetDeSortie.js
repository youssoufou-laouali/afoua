const mongoose= require('mongoose')
const Schema= mongoose.Schema

const BilletDeSortieSchema= new Schema({
    visiteRetour:{
        type: Date
    },
    ordonnanceSortie1:{
        type: String,
    },
    ordonnanceSortie2:{
        type: String,
    },
    ordonnanceSortie3:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    dateSortie: {
        type: Date
    },
    diagnosticRetenu: {
        type: String
    },
    dureeHospitalisation: {
        type: String
    },
    finPeriode: {
        type: Date
    },
    debutPeriode: {
        type: Date,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    motifHospitalisation : {
        type: String
    }
})

module.exports= BilletDeSortie = mongoose.model('billetdesortie', BilletDeSortieSchema )