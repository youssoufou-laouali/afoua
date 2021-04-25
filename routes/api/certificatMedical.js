const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const CertificatMedical = require('../../models/certificatMedical')


// ajouter un certificat Medical
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newCertificatMedical= new CertificatMedical({
        constat: req.body.constat,
        createdBy: decodedToken.id,
        patient: req.body.patient
    })

    newCertificatMedical.save()
    .then(response=> res.json({certificatMedical: response}))
    .catch(errors=> res.json({errors}))
})

// charger les certificats medical d'un patient

router.post('/', auth, (req, res)=>{
    CertificatMedical.find({patient: req.body.patient})
    .then(response=> res.json({certificatMedical: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router