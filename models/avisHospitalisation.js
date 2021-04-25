const mongoose= require('mongoose')
const Schema= mongoose.Schema

const AvisHospitalisationSchema= new Schema({
    
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
    diagnosticCliniqueEntree: {
        type: String
    },
    dateHospitalisation: {
        type: Date
    },
    dureeHospitalisation: {
        type: Number
    }
   
})

module.exports= AvisHospitalisation = mongoose.model('avishospitalisation', AvisHospitalisationSchema )