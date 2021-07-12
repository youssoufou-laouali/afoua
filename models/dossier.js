const mongoose= require('mongoose')
const Schema= mongoose.Schema

const dossierSchema= new Schema({
    sexe: {
        type: String
    },
    adresse:{
        type: String
    },
    assure:{
        type: String
    },
    numPolice:{
        type: String
    },
    numAssure:{
        type: String
    },
    entree:{
        type: Date
    },
    sortie:{
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
        type: String
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
    resume:{
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
    observations:{
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
    examensUlterieurs:[
        {
        },
    ],
})

module.exports= Dossier = mongoose.model('dossier', dossierSchema)