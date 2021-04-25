const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const SoinsUrgence = require('../../models/soinsUrgence')

//Ajouter un soins en urgence
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newSoinsUrgence= new SoinsUrgence({
        designation: req.body.designation,
        createdBy: decodedToken.id,
        patient: req.body.id
    })

    newSoinsUrgence.save()
    .then(response=> res.json({soinsUrgence: response}))
    .catch(errors=> res.json({errors}))
})

// Charger les soins en urgence d'un patient
router.post('/', auth, (req, res)=>{
    SoinsUrgence.find({patient: req.body.id})
    .then(response=> res.json({soinsUrgence: response}))
    .catch(errors => res.json({errors}))
})

module.exports = router