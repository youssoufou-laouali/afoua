const mongoose= require('mongoose')
const Schema= mongoose.Schema

const SoinsUrgenceSchema= new Schema({
    demande:[
        
    ],
    
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
})

module.exports= SoinsUrgence = mongoose.model('soinsurgence', SoinsUrgenceSchema )