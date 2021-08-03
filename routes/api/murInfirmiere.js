const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const MurInfirmiere = require('../../models/murInfirmiere')
const auth = require('../../middleware/auth')

// get pour les infirmieres
router.get('/', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    MurInfirmiere.find()
    .populate({
        path: 'mur',
        populate: {
            path: 'patient', select: 'name lastName phone dateDeNaissance lieuDeNaissance',
        },
    })
    .then(responses=> res.json(responses))
    .catch(errors=> res.json({errors}))
}) 

router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');
    const newMurInfirmiere =  new MurInfirmiere({
        mur: req.body.id,
        motif: req.body.motif,
    })
   newMurInfirmiere.save
   .then(response=> res.json(response))
   .catch(err=> res.json(err))
})

router.post('/', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');
    murInfirmiere.findOneAndDelete({_id: req.body.id})
    .then(accueil=> res.json({accueil}))
    .catch(errors=> res.json({errors}))
})

module.exports = router