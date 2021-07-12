const mongoose= require('mongoose')
const Schema= mongoose.Schema

const ImagerieSchema= new Schema({
    
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
    
    echographie :{
        type : String
    },
    observations: {
        type: String
    },
    conclusion: {
        type: String
    },
    radiographie: {
        type: String
    },
    rapport: {
        type: String
    },
})

module.exports= Imagerie = mongoose.model('imagerie', ImagerieSchema )