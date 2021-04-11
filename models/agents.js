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
        required: true
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
    }

})

module.exports= Agent = mongoose.model('agent',AgentSchema )