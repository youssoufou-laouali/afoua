const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CertificatMedicalSchema= new Schema({
    constat:{
        type: String
    },
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

module.exports= CertificatMedical = mongoose.model('certificatmedical', CertificatMedicalSchema )