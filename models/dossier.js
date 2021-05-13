const mongoose= require('mongoose')
const Schema= mongoose.Schema

const dossierSchema= new Schema({
    adresse:{
        type: String
    },
    observationDr:{
        type: Number
    },
    assure:{
        type: String
    },
    nPolice:{
        type: String
    },
    nAssure:{
        type: String
    },
    dateEntree:{
        type: Date
    },
    dateSortie:{
        type: Date
    },
    chambre:{
        type: String
    },
    motifConsultation:{
        type: String
    },
    histoireMaladie:{
        type: String
    },
    medicale:{
        type: String
    },
    chirurgical:{
        type: String
    },
    gynecoObstetrique:{
        type: String
    },
    resume:{
        type: String
    },
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
    compteRenduHospitalisation : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "compterenduhospitalisation"
    },
    examensUlterieurs:[
        {
            dateHeureMedecin: {
                type: String
            },
            compteRendu:{
                type: String
            },
            modification:{
                type: String
            }

        }
    ]
})

module.exports= Dossier = mongoose.model('dossier', dossierSchema)