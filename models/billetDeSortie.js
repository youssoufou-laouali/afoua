const mongoose= require('mongoose')
const Schema= mongoose.Schema

const BilletDeSortieSchema= new Schema({
    visiteRetour:{
        type: Date
    },
    ordonnanceSortie:{
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
        type: Number
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