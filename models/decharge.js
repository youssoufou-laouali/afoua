const mongoose= require('mongoose')
const Schema= mongoose.Schema

const DechargeSchema= new Schema({
    
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
    
    responsable: {
        type: String
    },

    typeResponsable:{
        malade:{
            type: Boolean
        },
        parent:{
            type: Boolean
        },
        accompagnant:{
            type: Boolean
        }
    }
    
   
})

module.exports= Decharge = mongoose.model('decharge', DechargeSchema )