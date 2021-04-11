const express = require('express')
const router= express.Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const Agent = require('../../models/agents')

router.post('/register', (req, res)=>{
    Agent.findOne({email: req.body.email})
        .then(agent=>{
            if(agent) res.status(400).json({email: 'cette adresse mail existe déja, veillez vous connecter!'})
            else{
                const newAgent= new Agent({
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: req.body.password,
                    post: req.body.post
                })
            }
        })
})

router.post('/login', (req, res)=>{
    const email= req.body.email
    const password= req.body.password

    Agent.findOne({ email})
    .then(agent=>{
        if(!agent) return res.status(404).json({ email: 'Email non trouvée'})
        bcrypt.compare(password, agent.password)
        .then(isMatch=>{
            if(isMatch){
                const payload= {id: agent.id, name: agent.name, lastName: agent.lastName, post: agent.post, phone: agent.phone}
                jwt.sign(payload, 
                        'SECRET_KEY',
                        { expiresIn: '24h' },
                        (err, token)=>{
                            res.json({
                                success: true,
                                token: 'issi' + token
                            })
                        })
            }else res.status(400).json({password: 'mot de passe incorrecte'})
        })
    })
})

module.exports = router