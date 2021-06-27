const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const EchograhieAbdominale = require('../../models/echographieAbdominale')

//Ajouter une decharge pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new EchograhieAbdominale({
        createdBy: decodedToken.id,
        ...req.body
    })

    newElement.save()
    .then(response=> res.json({echo: response}))
    .catch(errors=> res.json({errors}))

})

// charger les decharges d'un patient
router.get('/', auth, (req, res)=>{
    EchograhieAbdominale.find({patient: req.body.id})
    .then(response=> res.json({echo: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router