const mongoose= require('mongoose')
const Schema= mongoose.Schema

const accueilSchema= new Schema({
    demande:{
        type: String,
        required: true
    },
    assurencePriseEnCharge:{
        type: String,
    },
    pourcentagePriseEnCharge:{
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    agentAccueil : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
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
    price:{
        type: Number
    },
    paye:{
        type: Number,
        
    }
})

module.exports= Accueil = mongoose.model('accueil', accueilSchema )