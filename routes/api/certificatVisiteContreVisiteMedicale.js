const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const certificatVisiteContreVisite = require('../../models/certificatVisiteContreVisite')


// ajouter un certificat de visite et contre visite Medical
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newCertificatVisiteContreVisite= new certificatVisiteContreVisite({
        createdBy: decodedToken.id,
        createdBy2: req.body.agent2,
        patient: req.body.patient,

    })

    newCertificatVisiteContreVisite.save()
    .then(response=> res.json({certificatVisiteContreVisite: response}))
    .catch(errors=> res.json({errors}))
})

// charger les certificats de visite et contre visite  medical d'un patient

router.post('/', auth, (req, res)=>{
    certificatVisiteContreVisite.find({patient: req.body.patient})
    .then(response=> res.json({certificatVisiteEtContreVisiteMedicale: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router