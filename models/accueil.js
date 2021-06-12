const mongoose= require('mongoose')
const Schema= mongoose.Schema

const accueilSchema= new Schema({
    demande:{
        type: Array,
        required: true
    },
    assurencePriseEnCharge:{
        type: String,
    },
    pourcentage:{
        type: Number,
    },
    numPC:{
        type: String,
    },
    police:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    agentAccueil : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    module : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "module"
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    agentConsultant :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    agentPerception :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    montant:{
        type: Number
    },
    post:{
        type: String, 
    }
})

module.exports= Accueil = mongoose.model('accueil', accueilSchema )