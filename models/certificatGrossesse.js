const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CertificatGrossesseSchema= new Schema({
    grossesse:{
        type: String
    },
    semaine:{
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    datePrevuAccouchement: {
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