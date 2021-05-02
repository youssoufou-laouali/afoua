const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Medicament = require('../../models/medicament')
const auth = require('../../middleware/auth')
const DeclarationGrossesse = require('../../models/declarationGrossesse')

//Ajouter une compte Rendu d'accouchement pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new DeclarationGrossesse({
        createdBy: decodedToken.id,
        patient: req.body.id,
        nombreMois: req.body.nombreMois,
        mari: req.body.mari,
        numSecuriteSociale: req.body.numSecuriteSociale,
        profession: req.body.profession,
        nomEmployeur: req.body.nomEmployeur,
        femme: req.body.femme,
        delivree: req.body.delivree,
        demeure: req.body.demeure,
    })

    newElement.save()
    .then(response=> res.json({cra: response}))
    .catch(errors=> res.json({errors}))

})

// charger les compte rendu d'accouchement d'un patient
router.get('/', auth, (req, res)=>{
    DeclarationGrossesse.find({patient: req.body.id})
    .then(response=> res.json({cra: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router