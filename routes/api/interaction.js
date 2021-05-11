const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Interaction = require('../../models/interaction')
const Agent = require('../../models/agents')
const auth = require('../../middleware/auth')

const validateInteractionAdd = require('../../validation/interactionAdd')

// Ajouter un libellé
router.post('/add', auth, (req, res)=>{

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    Agent.findById(decodedToken.id)
    .then(agent=> {
        if(!agent.isAdmin){
            res.status(400).json({errors: "vous n'avez pas le droit d'administrateur"})
        }else{

            Interaction.findOne({label: req.body.label})
            .then(label=>{
                if(label){
                    res.json({errors: 'ce libellé existe déja', label})
                }else{
                    const { errors, isValid } = validateInteractionAdd(req.body)
                    if(!isValid){
                        return res.status(400).json(errors)
                    }
                
                    const newInteraction = new Interaction({
                        label: req.body.label,
                        price: req.body.price,
                        poste: req.body.poste,
                        createdBy: decodedToken.id
                    })
                
                    newInteraction
                    .save()
                    .then(label=> res.status(201).json({label}))
                    .catch(errors=> res.json({errors}))
                }
                
            })
            .catch(errors=> res.json({errors}))

        }
    })
    .catch(errors=> res.json({errors}))

})

//recuperer les libellés à accueil
router.get('/accueil', auth, (req, res)=>{
    Interaction.find({}, {label:1, poste:1, _id:0})
    .then(interaction=> res.json({interaction}))
    .catch(errors=> res.json({errors}))
})


//recuperer les libellés à la perception
router.get('/perception', auth, (req, res)=>{
    Interaction.find({})
    .then(interaction=> res.json({interaction}))
    .catch(errors=> res.json({errors}))
})

//Modifier un libellé
router.post('/update', auth, (req, res)=>{


    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    Agent.findById(decodedToken.id)
    .then(agent=> {
        if(!agent.isAdmin){
            res.status(400).json({errors: "vous n'avez pas le droit d'administrateur"})
        }else{

            const { errors, isValid } = validateInteractionAdd(req.body)
            if(!isValid){
                return res.status(400).json(errors)
            }

            Interaction.updateOne({_id: req.body.id}, 
                { $set:
                    {
                        label: req.body.label,
                        price: req.body.price,
                        poste: req.body.poste,
                        createdBy: decodedToken.id,
                        dateAdd: Date.now()
                    }
                })
            .then(label=> res.json({label}))
            .catch(errors=> res.json({errors}))

        }
    })
    .catch(errors=> res.json({errors}))

})

module.exports = router