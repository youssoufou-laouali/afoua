const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const CertificatGrossesse = require('../../models/certificatGrossesse')

//Ajouter un certificat d'accouchement pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new CertificatGrossesse({
        createdBy: decodedToken.id,
        patient: req.body.id,
        nbreSemaine: req.body.nbreSemaine,
        nbreMois: req.body.nbreMois,
        datePrevu: req.body.datePrevu,
    })

    newElement.save()
    .then(response=> res.json(response))
    .catch(errors=> res.json({errors}))

})

// charger les certificat d'accouchement d'un patient
router.get('/', auth, (req, res)=>{
    CertificatGrossesse.find({patient: req.body.id})
    .then(response=> res.json(response))
    .catch(errors=> res.json({errors}))
})

module.exports = router