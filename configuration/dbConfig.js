const mongoose= require('mongoose')

mongoose.connect(
    "mongodb://localhost:27017/afoua",
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err)=>{
        if(!err){
         console.log('connected to database');
        }else
        console.log('error ' + err); 
    }
)