const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CertificatVisiteMedicaleSchema= new Schema({
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
    justification: {
        type: String
    }
})

module.exports= CertificatVisiteMedicale = mongoose.model('certificatvisitemedicale', CertificatVisiteMedicaleSchema )