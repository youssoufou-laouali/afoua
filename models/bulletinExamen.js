const mongoose= require('mongoose')
const Schema= mongoose.Schema

const bulletinExamenSchema= new Schema({
    demande:{
        type: String
    },
    reponse:{
        type: String
    },
    age:{
        type: Number
    },

    date: {
        type: Date,
        default: Date.now
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    createdBy2 : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
})

module.exports= bulletinExamen = mongoose.model('bulletinexamen', bulletinExamenSchema )