const express = require('express')
const app= express()
require('./configuration/dbConfig')
const users= require('./routes/api/users')

const port= process.env.PORT || 5000

app.use('/', (req, res)=> res.json({message: "connecter"}) )

// agent Routes
app.use('/api/users', users)


app.listen(port, ()=> console.log('serveur started on ', port))