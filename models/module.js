const mongoose= require('mongoose')
const Schema= mongoose.Schema

const moduleSchema= new Schema({
    perception:[
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
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
    },
    post:{
        type: String, 
    }
})

module.exports= Module = mongoose.model('module', moduleSchema )