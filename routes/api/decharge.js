const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Medicament = require('../../models/medicament')
const auth = require('../../middleware/auth')
const Decharge = require('../../models/decharge')

//Ajouter une decharge pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new Decharge({
        createdBy: decodedToken.id,
        patient: req.body.id,
        responsable: req.body.responsable,
        typeResponsable: req.body.typeResponsable
    })

    newElement.save()
    .then(response=> res.json({decharge: response}))
    .catch(errors=> res.json({errors}))

})

// charger les decharges d'un patient
router.get('/', auth, (req, res)=>{
    Decharge.find({patient: req.body.id})
    .then(response=> res.json({decharge: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router