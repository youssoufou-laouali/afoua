const mongoose= require('mongoose')
const Schema= mongoose.Schema

const DechargeSchema= new Schema({
    
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
    
    soussigne :{
        type : String
    },
    responsable: {
        type: String
    },
    
   
})

module.exports= Decharge = mongoose.model('decharge', DechargeSchema )