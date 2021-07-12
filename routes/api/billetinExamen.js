const express = require('express')
const router= express.Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const bulletinExamen = require('../../models/bulletinExamen')

//ajouter un billet de sortie
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newBulletinExamen= new bulletinExamen({
        demande: req.body.demande,
        createdBy: decodedToken.id,
        patient: req.body.patient,
    })

    newBulletinExamen.save()
        .then(response=> res.json( response))
        .catch(errors=> res.json({errors}))
})

//mise à jour
router.post('/update', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    bulletinExamen.findOneAndUpdate({_id: req.body.id, 
        $set: {
            response: req.body.response,
            createdBy2: decodedToken.id
        }
    })
})

// Charger les billets de sortie d'un patient
router.get('/', auth, (req, res)=>{
    bulletinExamen.find({patient: req.body.id})
        .populate('patient')
        .then(response=> res.json( response))
        .catch(errors=> res.json({errors}))
})

module.exports = router