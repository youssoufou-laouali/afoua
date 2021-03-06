const mongoose= require('mongoose')
const Schema= mongoose.Schema

const moduleSchema= new Schema({
    
    date: {
        type: Date,
        default: Date.now
    },
    perception:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "accueil"
    },
    patient:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    avisHospitalisation : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "avishospitalisation"
    },
    billetDeSortie : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "billetdesortie"
    },
    bulletinExamen :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "bulletinexamen"
    },
    certificatAccouchement :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "certificataccouchement"
    },
    certificatGrossesse :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "certificatgrossesse"
    },
    certificatMedical :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "certificatmedical"
    },
    certificatVisiteMedicale :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "certificatvisitemedicale"
    },
    certificatVisiteContreVisite :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "certificatvisitecontrevisite"
    },
    compteRenduAccouchement :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "compterenduaccouchement"
    },
    compteRenduHospitalisation :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "compterenduhospitalisation"
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    decharge :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "decharge"
    },
    declarationGrossesse :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "declarationgrossesse"
    },
    dossier :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "dossier"
    },
    echographieAbdominale :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "echographieabdominale"
    },
    echoVesicoProstatique :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "echovesicoprostatique"
    },
    infirmiere :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "infirmiere"
    },
    soinsUrgence :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "soinsurgence"
    },
    
    ordonnances:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ordonnance'
        }
    ],
})

module.exports= Module = mongoose.model('module', moduleSchema )