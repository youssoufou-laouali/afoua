const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Medicament = require('../../models/medicament')
const auth = require('../../middleware/auth')
const Ordonnance = require('../../models/ordonnance')

//Ajouter une ordonnance pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newOrdonnance= new Ordonnance({
        createdBy: decodedToken.id,
        patient: req.body.id,
        medicaments: req.body.medicaments
    })

    newOrdonnance.save()
    .then(response=> res.json({ordonnance: response}))
    .catch(errors=> res.json({errors}))

})

// charger les ordonnances d'un patient
router.get('/', auth, (req, res)=>{
    Ordonnance.find({patient: req.body.id})
    .populate('medicaments')
    .then(response=> res.json({ordonnance: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router