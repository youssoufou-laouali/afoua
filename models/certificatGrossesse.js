const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CertificatGrossesseSchema= new Schema({
    nbreSemaine:{
        type: Number
    },
    nbreMois:{
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    datePrevu: {
        type: Date
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

module.exports= CertificatGrossesse = mongoose.model('certificatgrossesse', CertificatGrossesseSchema )