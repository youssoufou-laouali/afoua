const mongoose= require('mongoose')
const Schema= mongoose.Schema

const OrdonnanceSchema= new Schema({
    
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
    medicaments :[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "medicament"
    }],
   
})

module.exports= Ordonnance = mongoose.model('ordonnance', OrdonnanceSchema )