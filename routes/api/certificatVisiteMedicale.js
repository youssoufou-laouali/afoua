const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const CertificatVisiteMedicale = require('../../models/certificatVisiteMedicale')


// ajouter un certificat de visite Medical
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newCertificatVisiteMedicale= new CertificatVisiteMedicale({
        createdBy: decodedToken.id,
        patient: req.body.patient
    })

    newCertificatVisiteMedicale.save()
    .then(response=> res.json({certificatVisiteMedicale: response}))
    .catch(errors=> res.json({errors}))
})

// charger les certificats de visite medical d'un patient

router.post('/', auth, (req, res)=>{
    CertificatVisiteMedicale.find({patient: req.body.patient})
    .then(response=> res.json({certificatVisiteMedicale: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router