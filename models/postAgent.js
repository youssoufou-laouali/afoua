const mongoose= require('mongoose')
const Schema= mongoose.Schema

const PostAgentSchema= new Schema({
    
    posts :[{
        type : String,
    }],
   
})

module.exports= PostAgent = mongoose.model('postAgent', PostAgentSchema )