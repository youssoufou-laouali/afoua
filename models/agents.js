const mongoose= require('mongoose')
const Schema= mongoose.Schema

const AgentSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
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
        required: true
    },
    post:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    urlPhoto: {
        type: String
    },
    dateDeNaissance: {
        type: String
    },
    debutContrat: {
        type: Date
    },
    finContrat: {
        type: Date
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    active: {
        type: Boolean,
        default: true
    },
})

module.exports= Agent = mongoose.model('agent', AgentSchema )