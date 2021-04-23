const express = require('express')
const app= express()
const cors= require('cors')
require('./configuration/dbConfig')
const bodyParser= require('body-parser')
const agent= require('./routes/api/agent')
const patient = require('./routes/api/patient')
const interaction= require('./routes/api/interaction')
const murAccueil= require('./routes/api/murAccueil')
const accueil= require('./routes/api/accueil')
const medecinGeneraliste= require('./routes/api/medecinGeneraiste')


const port= process.env.PORT || 5000
 
app.use(cors())
//body-parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())




// agent Routes
app.use('/api/agent', agent)

// patient Routes
app.use('/api/patient', patient)

//interaction Routes
app.use('/api/interaction', interaction)

//accueil Routes
app.use('/api/accueil', accueil)

//mur Accueil
app.use('/api/muraccueil', murAccueil)

// medecin Generaliste
app.use('/api/generaliste', medecinGeneraliste)


app.listen(port, ()=> console.log('serveur started on ', port))