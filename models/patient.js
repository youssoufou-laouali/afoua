const mongoose= require('mongoose')
const Schema= mongoose.Schema

const patientSchema= new Schema({
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
    },
    dateCreation: {
        type: Date,
        default: Date.now
    },
    urlPhoto: {
        type: String
    },
    dateDeNaissance: {
        type: Date
    },
    lieuDeNaissance: {
        type: String
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    }
})

module.exports= Patient = mongoose.model('patient', patientSchema )