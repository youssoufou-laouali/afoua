const mongoose= require('mongoose')
const Schema= mongoose.Schema

const murGeant= new Schema({

    geant : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "accueil"
    }
})

module.exports= MurGeant = mongoose.model('murgeant', murGeant )