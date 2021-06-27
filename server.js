const express = require('express')
const mongoose = require('mongoose')
const app= express()
const http= require("http")
const soketIo= require("socket.io")
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
const postAgent= require('./routes/api/postAgent')
const certificatVisiteMedicale= require('./routes/api/certificatVisiteMedicale')
const certificatMedical= require('./routes/api/certificatMedical')
const modules = require('./routes/api/module')
const certificatVisiteContreVisite= require('./routes/api/certificatVisiteContreVisiteMedicale')
const decharge = require('./routes/api/decharge')
const soinsurgence = require('./routes/api/soinsUrgence')
const compteRenduHospitalisation = require('./routes/api/compteRenduHospitalisation')
const certificatGrossesse= require('./routes/api/certificatGrossesse')
const certificatAccouchement= require('./routes/api/certificatAccouchement')
const avisHospitalisation = require('./routes/api/avisHospitalisation')
const echograhieAbdominale= require('./routes/api/echographieAbdominale')
const echoVesicoProstatique= require('./routes/api/echoVesicoProstatique')
const billetDeSortie= require('./routes/api/billetDeSortie')
const infirmiere= require('./routes/api/infirmiere')

const port= process.env.PORT || 5000
 

//body-parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

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

//posts
app.use('/api/post', postAgent)

//certificatVisiteMedicale
app.use('/certificatvisitemedicale', certificatVisiteMedicale)

//Module
app.use('/module', modules)

//certificatVisiteContreVisite
app.use('/certificatvisitecontrevisite', certificatVisiteContreVisite)

//decharge
app.use('/decharge', decharge)

//certificatMedical
app.use('/certificatmedical', certificatMedical)

//soinsUrgence
app.use('/soinsurgence', soinsurgence)

//compteRenduHospitalisation
app.use('/compterenduhospitalisation', compteRenduHospitalisation)

//certificatGrossesse
app.use('/certificatgrossesse', certificatGrossesse)

//certificatAccouchement
app.use('/certificataccouchement', certificatAccouchement)

//avisHospitalisation
app.use('/avishospitalisation', avisHospitalisation)
//echograhieAbdominale
app.use('/echographieabdominale', echograhieAbdominale)
//echoVesicoProstatique
app.use('/echovesicoprostatique', echoVesicoProstatique)
//billetDeSortie
app.use('/billetsortie', billetDeSortie)
//infirmiere
app.use('/infirmiere', infirmiere)

const server =http.createServer(app)
const io = soketIo(server, 
{
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
})
io.on('connection', (socket) => { 
    console.log(socket.id);
    console.log('un client est connecté');

    socket.emit("message", {a:'Bonjour'})

    socket.on("accueil", data =>{
        socket.broadcast.emit("muraccueil", data)
    })

    socket.on("perception", data=>{
        socket.broadcast.emit("murgeant", data)
    })



    socket.on("disconnect", ()=>{
        console.log(socket.id);
    })
    
});

server.listen(port, ()=> console.log('serveur started on ', port))


