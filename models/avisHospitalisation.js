const mongoose= require('mongoose')
const Schema= mongoose.Schema

const ConsultationPediatriqueSchema= new Schema({
    
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
    
    assurance :{
        type : String
    },
    numAssure: {
        type: String
    },
    nomAssure: {
        type: String
    },
    societe: {
        type: String
    },
    diagnostic: {
        type: String
    },
    dateHospitalisation: {
        type: Date
    },
    timeHospitalisation: {
        type: String
    },
    dureeHospitalisation: {
        type: Number
    }
   
})

module.exports= ConsultationPediatrique = mongoose.model('consultationpediatrique', ConsultationPediatriqueSchema )