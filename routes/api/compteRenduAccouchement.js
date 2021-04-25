const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Medicament = require('../../models/medicament')
const auth = require('../../middleware/auth')
const CompteRenduAccouchement = require('../../models/compteRenduAccouchement')

//Ajouter une compte Rendu d'accouchement pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new CompteRenduAccouchement({
        createdBy: decodedToken.id,
        patient: req.body.id,
        text: req.body.text
    })

    newElement.save()
    .then(response=> res.json({cra: response}))
    .catch(errors=> res.json({errors}))

})

// charger les compte rendu d'accouchement d'un patient
router.get('/', auth, (req, res)=>{
    CompteRenduAccouchement.find({patient: req.body.id})
    .then(response=> res.json({cra: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router