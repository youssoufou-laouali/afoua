const mongoose= require('mongoose')
const Schema= mongoose.Schema

const murInfirmiere= new Schema({

    mur : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "bulletinexamen"
    },
    motif: {
        type: String
    }
})

module.exports= MurInfirmiere = mongoose.model('murinfirmiere', murInfirmiere )