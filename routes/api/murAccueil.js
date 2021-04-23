const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Accueil = require('../../models/accueil')
const MurAccueil = require('../../models/murAccueil')
const auth = require('../../middleware/auth')

// un get pour les agents de la perception
router.get('/', auth, (req, res)=>{
    MurAccueil.find()
    .populate({
        path: 'accueil',
        populate: {
            path: 'patient agentConsultant', select: 'name lastName post',
        }
    })
    .then(accueil=> res.json({accueil}))
    .catch(errors=> res.json({errors}))
})


module.exports = router