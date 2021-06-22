const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CertificatVisiteContreVisiteSchema= new Schema({
  
    date: {
        type: Date,
        default: Date.now
    },
    justification1:{
        type: String
    },
    justification2:{
        type: String
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

module.exports= CertificatVisiteContreVisite = mongoose.model('certificatvisitecontrevisite', CertificatVisiteContreVisiteSchema )