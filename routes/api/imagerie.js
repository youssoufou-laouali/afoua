const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const Imagerie = require('../../models/imagerie')

//Ajouter une compte Rendu d'accouchement pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new Imagerie({
        createdBy: decodedToken.id,
        ...req.body,
    })

    newElement.save()
    .then(response=> res.json( response))
    .catch(errors=> res.json({errors}))

})

// charger les compte rendu d'accouchement d'un patient
router.get('/', auth, (req, res)=>{
    Imagerie.find({patient: req.body.id})
    .then(response=> res.json(response))
    .catch(errors=> res.json({errors}))
})

module.exports = router