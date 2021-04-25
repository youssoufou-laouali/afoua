const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CertificatAccouchementSchema= new Schema({
    nomme:{
        type: String
    },
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
    dateAcouchement: {
        type: Date
    },
    sexe: {
        type: String
    },
    fils: {
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