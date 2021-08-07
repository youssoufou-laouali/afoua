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
        data: req.body.data,
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
            data: req.body.data,
            createdBy2: decodedToken.id
        }
    })
    .then(response=> res.json(response))
    .catch(err=> res.json(err))
})
//infirmiere
router.post('/infirmiere', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    bulletinExamen.findOneAndUpdate({_id: req.body.id, 
        $set: {
            data: req.body.data
        }
    })
    .then(response=> res.json(response))
    .catch(err=> res.json(err))
})

// Charger les billetin d'examen d'un patient
router.post('/', auth, (req, res)=>{
    bulletinExamen.find({patient: req.body.id})
        .populate('patient')
        .then(response=> res.json( response))
        .catch(errors=> res.json({errors}))
})
// rechercher un billetin d'examen
router.post('/one', auth, (req, res)=>{
    bulletinExamen.findById(req.body.id)
        .populate('patient')
        .then(response=> res.json( response))
        .catch(errors=> res.json({errors}))
})

module.exports = router