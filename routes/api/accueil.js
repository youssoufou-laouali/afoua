const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Accueil = require('../../models/accueil')
const MurAccueil = require('../../models/murAccueil')
const auth = require('../../middleware/auth')
const Generaliste = require('../../models/medecingeneraliste')

const validateAccueil = require('../../validation/accueil')
const validatePerception = require('../../validation/perception')


// Ajouter une consultation sur le mur accueil pour les agents de la perception
router.post('/add', auth, (req, res)=>{

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const { errors, isValid } = validateAccueil(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    const newAcceuil = new Accueil({
        demande: req.body.demande,
        post: req.body.post,
        price: req.body.price,
        assurencePriseEnCharge: req.body.assurencePriseEnCharge,
        pourcentagePriseEnCharge: req.body.pourcentagePriseEnCharge,
        agentAccueil: decodedToken.id,
        patient: req.body.patient,
        agentConsultant: req.body.agentConsultant,
    })    

    newAcceuil
    .save()
    .then(accueil=> {
        const addMurAccueil= new MurAccueil({
            accueil: accueil._id
        })

        addMurAccueil
        .save()
        .then(mur=> res.status(201).json({accueil}))
        .catch(errors => res.json({errors}))
    })
    .catch(errors=> res.json({errors}))

})


//valider le payement d'une consultation pour un patient et d'ajouter sur le mur medecin concerné
router.post('/perception', auth, (req, res)=>{

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const { errors, isValid } = validatePerception(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    Accueil.findOne({_id: req.body.id})
    .then(accueil=> {
        if(accueil) {
            
            Accueil.updateOne({_id: req.body.id},
                { $set:
                    {
                        agentPerception: decodedToken.id,
                        price: req.body.price,
                        paye: req.body.paye,
                        assurencePriseEnCharge: req.body.assurencePriseEnCharge,
                        pourcentagePriseEnCharge: req.body.pourcentagePriseEnCharge,
                    }
            })
            .then(perception=> {
               // if(perception.post== 'medecinGeneraliste'){
                    const newMedecinGeneraliste= new Generaliste({
                        generaliste: accueil._id
                    })

                    newMedecinGeneraliste
                    .save()
                    .then(generaliste=> {
                        MurAccueil.findOneAndDelete({}, {accueil: accueil._id})
                        .then(supprime => res.json({generaliste, supprime}))
                    })
                    .catch(errors => res.json({errors}))
               // }
            })
            .catch(errors=> res.json({errors}))
        }else{
            res.json({errors: 'rien trouver'})
        }
    })
    .catch(errors=>res.json({errors}))
   

})

module.exports = router