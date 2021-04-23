const express = require('express')
const router= express.Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const Agent = require('../../models/agents')
const auth = require('../../middleware/auth')

const validateAgentLogin = require('../../validation/agentLogin')
const validateAgentRegistration = require('../../validation/agentRegistration')
const validateAgentUpdate = require('../../validation/agentUpdate')

// Creer un administrateur par un super-admin
router.post('/admin', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(decodedToken.post != 'superAdmin'){
        return res.json({errors: 'Vous n\'avez pas le droit de creer un administrateur'})
    }else{

        const { errors, isValid } = validateAgentRegistration(req.body)

        if(!isValid){
            return res.status(400).json(errors)
        }

        Agent.findOne({phone: req.body.phone})
            .then(agent => {
                if(agent){
                    return res.status(400).json({errors: 'ce numéro de téléphone existe déja, veillez vous connecter!'})
                }
                let newAdmin= new Agent({
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: req.body.password,
                    post: req.body.post,
                    urlPhoto: req.body.urlPhoto,
                    dateDeNaissance: req.body.dateDeNaissance,
                    isAdmin: true,
                    createdBy: decodedToken.id
                })

                bcrypt.genSalt(5, (err, salt)=> {
                    bcrypt.hash(newAdmin.password, salt, (err, hash)=> {
                        newAdmin.password= hash

                    newAdmin
                    .save()
                    .then(agent=> res.status(201).json({agent}))
                    .catch(errors=> res.json({errors}))    
                    });
                });


            })
            .catch(errors=> res.json({errors}))
    }
})

// Ajouter un Agent par un Administrateur
router.post('/register', auth,(req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(!decodedToken.isAdmin){
        console.log(decodedToken.isAdmin);
        return res.json({errors: 'Vou n\'avez le droit pour cette opération'})
    }else{

        const { errors, isValid } = validateAgentRegistration(req.body)

        if(!isValid){
            return res.status(400).json(errors)
        }

        Agent.findOne({phone: req.body.phone})
            .then(agent=>{
                if(agent){
                    return res.status(400).json({phone: 'ce numéro de téléphone existe déja, veillez vous connecter!'})
                } 
                else{
                    const newAgent= new Agent({
                        name: req.body.name,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: req.body.password,
                        post: req.body.post,
                        urlPhoto: req.body.urlPhoto,
                        dateDeNaissance: req.body.dateDeNaissance,
                        debutContrat: req.body.debutContrat,
                        finContrat: req.body.finContrat,
                        createdBy: decodedToken.id
                    })


                    bcrypt.genSalt(5, (err, salt)=> {
                        bcrypt.hash(newAgent.password, salt, (err, hash)=> {
                            newAgent.password= hash
    
                            newAgent
                        .save()
                        .then(agent=> res.status(201).json({agent}))
                        .catch(errors=> res.json({errors}))    
                        });
                    });
                }
            })
    }
})

// Agent login
router.post('/login', (req, res)=>{

    const { errors, isValid } = validateAgentLogin(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    const phone= req.body.phone
    const password= req.body.password

    Agent.findOne({ phone})
    .then(agent=>{
        if(!agent){
            return res.status(404).json({ phone: 'Ce numéro n\'existe pas'})
        } else{
            if(!agent.active){
                return res.json({errors: 'Votre compte est désactivée'})
            }
            else{

            
            bcrypt.compare(password, agent.password)
            .then(isMatch=>{
                if(isMatch){
                    const payload= {id: agent.id, name: agent.name, lastName: agent.lastName, post: agent.post, phone: agent.phone, isAdmin: agent.isAdmin, active: agent.active}
                    jwt.sign(payload, 
                            'SECRET_KEY',
                            { expiresIn: '24h' },
                            (err, token)=>{
                                res.json({
                                    success: true,
                                    token: 'issi ' + token
                                })
                            })
                }else res.status(400).json({password: 'mot de passe incorrecte'})
            })
            .catch(errors=> res.json({errors}))
            }
        }
        
    })
})

// Mettre à jour le profil Agent
router.post('/profil', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(decodedToken.id != req.body.id){
        return res.json({errors: 'Vous n\'avez pas le droit pour cette opération'})
    }else{

        const { errors, isValid } = validateAgentUpdate(req.body)

        if(!isValid){
            return res.status(400).json(errors)
        }
        if(!decodedToken.active){
            return res.json({errors: 'votre compte est désactivé'})
        }
        Agent.updateOne({_id:decodedToken.id},
            {
                $set: {
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    urlPhoto: req.body.urlPhoto,
                    dateDeNaissance: req.body.dateDeNaissance,
                }
            })
            .then(agent=> res.json({agent}))
            .catch(errors=> res.json({errors}))
    }
}) 

// Reset Password
router.post('/password', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(decodedToken.id != req.body.id){
        return res.json({errors: 'Vous n\'avez pas le droit pour cette opération'})
    }else{
        if(req.body.password){
            bcrypt.genSalt(5, (err, salt)=> {
                bcrypt.hash(req.body.password, salt, (err, hash)=> {
                    const password= hash
                    Agent.updateOne({_id: req.body.id},
                        {
                            $set: {
                                password: password
                            }
                        })
                        .then(agent=> res.json({agent}))
                        .catch(errors=> res.json({errors}))

                });
            });
        }
    }
})

//change Password Agent by administrateur
router.post('/reset', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(!decodedToken.isAdmin){
        return res.json({errors: 'Vous n\'avez pas le droit pour cette opération'})
    }else{
      
        if(req.body.password){
            bcrypt.genSalt(5, (err, salt)=> {
                bcrypt.hash(req.body.password, salt, (err, hash)=> {
                    const password= hash
                    Agent.updateOne({phone: req.body.phone},
                        {
                            $set: {
                                password: password
                            }
                        })
                        .then(agent=> res.json({agent}))
                        .catch(errors=> res.json({errors}))

                });
            });
        }
    }
})


// Supprimer un agent par un Admin
router.post('/delete', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(!decodedToken.isAdmin){
        return res.json({errors:'Vous n\'avez pas le droit pour cette action'})
    }else{
        Agent.updateOne({_id: req.body.id},
            {
                $set: {
                    active: false
                }
            })
            .then(agent=> res.json({agent}))
            .catch(errors=> res.json({errors}))
    }
})

//lister tous les agents
router.get('/', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(!decodedToken.isAdmin){
        return res.json({errors:'Vous n\'avez pas le droit pour cette action'})
    }else{
        Agent.find()
        .then(agent=> res.json({agent}))
        .catch(errors=> res.json({errors}))
    }
})

//Chercher un agent par un admin
router.get('/agent', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(!decodedToken.isAdmin){
        return res.json({errors:'Vous n\'avez pas le droit pour cette action'})
    }else{
        Agent.find({phone: req.body.phone})
        .then(agent=> res.json({agent}))
        .catch(errors=> res.json({errors}))
    }
})
module.exports = router