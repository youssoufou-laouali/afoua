const mongoose= require('mongoose')
const Schema= mongoose.Schema

const murAccueilSchema= new Schema({

    accueil : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "accueil"
    }
})

module.exports= MurAccueil = mongoose.model('muraccueil', murAccueilSchema )