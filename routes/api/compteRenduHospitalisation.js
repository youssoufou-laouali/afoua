const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const CompteRenduHospitalisation = require('../../models/compteRenduHospitalisation')

//Ajouter une compte Rendu d'accouchement pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new CompteRenduHospitalisation({
        createdBy: decodedToken.id,
        ...req.body,
        patient: req.body.id,
        
    })

    newElement.save()
    .then(response=> res.json({cra: response}))
    .catch(errors=> res.json({errors}))

})

// charger les compte rendu d'accouchement d'un patient
router.get('/', auth, (req, res)=>{
    CompteRenduHospitalisation.find({patient: req.body.id})
    .then(response=> res.json({cra: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router