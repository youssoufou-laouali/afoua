const mongoose= require('mongoose')
const Schema= mongoose.Schema

const echoVesicoProstatiqueSchema= new Schema({
    renseignementClinique:{
        type: String
    },
    
    prostate:{
        type: String
    },
    vesiculeSeminale:{
        type: String
    },
    vessie:{
        type: String
    },
    volumeVesical:{
        type: String
    },
    paroisVesicale:{
        type: String
    },
    residuPostMictionnel:{
        type: String
    },
    reins:{
        type: String
    },
    conclusion:{
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

module.exports= EchoVesicoProstatique = mongoose.model('echovesicoprostatique', echoVesicoProstatiqueSchema)