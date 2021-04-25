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
const murGeant= require('./routes/api/murGeant')
const medicament= require('./routes/api/medicament')
const compteRenduAccouchement= require('./routes/api/compteRenduAccouchement')
const ordonnance= require('./routes/api/ordonnance')


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

// mur Geant
app.use('/api/geant', murGeant)

// medicament
app.use('/api/medicament', medicament)

//ordonnance
app.use('/api/ordonnance', ordonnance)

//Compte rendu d'accouchement
app.use('/api/cra', compteRenduAccouchement)


app.listen(port, ()=> console.log('serveur started on ', port))