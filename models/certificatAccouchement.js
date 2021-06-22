const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CertificatAccouchementSchema= new Schema({
    
    profession:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    mle: {
        type: String
    },
    dateAccouchement: {
        type: Date
    },
    sexe: {
        type: String
    },
    prenom: {
        type: String
    },
    pere: {
        type: String,
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

module.exports= CertificatAccouchement = mongoose.model('certificataccouchement', CertificatAccouchementSchema )