const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CertificatVisiteMedicaleSchema= new Schema({
    soussigne:{
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

module.exports= CertificatVisiteMedicale = mongoose.model('certificatvisitemedicale', CertificatVisiteMedicaleSchema )