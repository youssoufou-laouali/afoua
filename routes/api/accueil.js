const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Accueil = require('../../models/accueil')
const MurAccueil = require('../../models/murAccueil')
const auth = require('../../middleware/auth')
const MurGeant = require('../../models/murGeant')
const Module= require('../../models/module')

const validateAccueil = require('../../validation/accueil')
const validatePerception = require('../../validation/perception')


// Ajouter une consultation sur le mur accueil destinée aux agents de la perception
router.post('/add', auth, (req, res)=>{

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const { errors, isValid } = validateAccueil(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }
    const newAcceuil = new Accueil({
        demande: req.body.demande,
        assurencePriseEnCharge: req.body.assurencePriseEnCharge,
        agentAccueil: decodedToken.id,
        patient: req.body.patient,
        idSup: req.body.idSup,
    })    

    newAcceuil
    .save()
    .then(accueil=> {
        const addMurAccueil= new MurAccueil({
            accueil: accueil._id
        })

        addMurAccueil
        .save()
        .then(mur => res.status(201).json({accueil}))
        .catch(errors => res.json({errors}))
    })
    .catch(errors=> res.json({errors}))

})
// Ajouter une consultation sur le mur accueil destinée aux agents de la perception
router.post('/infirmiere', auth, (req, res)=>{

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY'); 

    Accueil.updateOne({_id: req.body.id},
        { $set:
            {
                post: req.body.post,
            }
    })
    .then(response=> res.json(response))
    .catch(err=> res.json(err))

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
            if(req.body.module){

            Accueil.updateOne({_id: req.body.id},
                { $set:
                    {
                        agentPerception: decodedToken.id,
                        demande: req.body.demande,
                        montant: req.body.montant,
                        assurencePriseEnCharge: req.body.assurencePriseEnCharge,
                        pourcentage: req.body.pourcentage,
                        post: req.body.post,
                        numPC: req.body.numPC,
                        police: req.body.police,
                        module: req.body.module
                    }
            })
            .then(perception=> {
               // if(req.body.post== 'medecinGeneraliste'){
                    const newMurGeant= new MurGeant({
                        geant: accueil._id
                    })

                    newMurGeant
                    .save()
                    .then(geant=> {
                        MurAccueil.findOneAndDelete({accueil: accueil._id})
                        .then(supprime => res.json({geant, supprime}))
                    })
                    .catch(errors => res.json({errors}))
               // }
            })
            .catch(errors=> res.json({errors}))
        }else{

            const newModule= new Module({
                patient: accueil.patient,
                perception: req.body.id
            })

            newModule.save()
            .then(module=>{

                Accueil.updateOne({_id: req.body.id},
                { $set:
                    {
                        agentPerception: decodedToken.id,
                        demande: req.body.demande,
                        montant: req.body.montant,
                        assurencePriseEnCharge: req.body.assurencePriseEnCharge,
                        pourcentage: req.body.pourcentage,
                        post: req.body.post,
                        numPC: req.body.numPC,
                        police: req.body.police,
                        module: module._id
                    }
                })
                .then(perception=> {
               // if(req.body.post== 'medecinGeneraliste'){
                    const newMurGeant= new MurGeant({
                        geant: accueil._id
                    })

                    newMurGeant
                    .save()
                    .then(geant=> {
                        MurAccueil.findOneAndDelete({accueil: accueil._id})
                        .then(supprime => res.json({geant, supprime}))
                    })
                    .catch(errors => res.json({errors}))
               // }
                })
            })
            .catch(errors=> res.json({errors}))
        }
        }else{
            res.json({errors: 'rien trouver'})
        }
    })
    .catch(errors=>res.json({errors}))
   

})

module.exports = router