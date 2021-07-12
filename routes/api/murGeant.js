const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Accueil = require('../../models/accueil')
const murGeant = require('../../models/murGeant')
const auth = require('../../middleware/auth')

// get pour les agents medecins
router.get('/', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    murGeant.find()
    .populate({
        path: 'geant',
        populate: {
            path: 'patient', select: 'name lastName phone dateDeNaissance lieuDeNaissance',
        },
    })
    .then(accueil=> res.json({accueil}))
    .catch(errors=> res.json({errors}))
})

router.post('/', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');
   console.log(req.body);
    murGeant.findOneAndDelete({_id: req.body.id})
    .then(accueil=> res.json({accueil}))
    .catch(errors=> res.json({errors}))
})

module.exports = router