const mongoose= require('mongoose')
const Schema= mongoose.Schema

const medecinGeneralisteSchema= new Schema({

    generaliste : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "accueil"
    }
})

module.exports= medecinGeneraliste = mongoose.model('medecingeneraliste', medecinGeneralisteSchema )