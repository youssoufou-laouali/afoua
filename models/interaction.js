const mongoose= require('mongoose')
const Schema= mongoose.Schema

const InteractionSchema= new Schema({
    label:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    poste:{
        type: String,
        required: true
    },
    dateAdd: {
        type: Date,
        default: Date.now
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    }
})

module.exports= Interaction = mongoose.model('interaction', InteractionSchema )