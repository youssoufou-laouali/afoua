const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Accueil = require('../../models/accueil')
const Medecingeneraliste = require('../../models/medecingeneraliste')
const auth = require('../../middleware/auth')

// get pour les agents medecins
router.get('/', auth, (req, res)=>{
    Medecingeneraliste.find()
    .populate({
        path: 'generaliste', select: 'demande patient agentConsultant',
        populate: {
            path: 'patient agentConsultant', select: 'name lastName post',
        }
    })
    .then(accueil=> res.json({accueil}))
    .catch(errors=> res.json({errors}))
})

module.exports = router