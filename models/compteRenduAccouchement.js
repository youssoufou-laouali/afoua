const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CompteRenduAccouchementSchema= new Schema({
    
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
    cra: {
        type: String,
        require: true
    }
   
})

module.exports= CompteRenduAccouchement = mongoose.model('compterenduaccouchement', CompteRenduAccouchementSchema )