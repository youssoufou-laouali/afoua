const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Patient = require('../../models/patient')
const auth = require('../../middleware/auth')


const validatePatientVerify = require('../../validation/patientVerify')
const validatePatientAdd = require('../../validation/patientAdd')

//Verifier l'existance du patient
router.post('/verify', auth, (req, res)=>{

    const { errors, isValid } = validatePatientVerify(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }

    Patient.find({phone: req.body.phone})
    .populate({
        path: 'createdBy', select: 'name lastName'
    })
    .then(patient=>{
        if(patient){    
            return res.json({patient})
        }else {
          return  res.json({errors: 'Patient non trouver'})
        }
    })
    .catch(errors => res.json({errors}))
})


//Ajouter un patient
router.post('/add', auth, (req, res)=>{
    const { errors, isValid } = validatePatientAdd(req.body)
        if(!isValid){
            return res.status(400).json(errors)
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newPatient = new Patient({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        urlPhoto: req.body.urlPhoto,
        dateDeNaissance: req.body.dateDeNaissance,
        createdBy: decodedToken.id
    })

    newPatient
    .save()
    .then(agent=> res.status(201).json(agent))
    .catch(errors => res.send(errors))
})



//Update patient
router.post('/update', auth, (req, res)=>{
    if(!req.body.id){
        return res.json({errors: "veillez choisir l'utilisateur à modifier"})
    }
    const { errors, isValid } = validatePatientAdd(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    Patient.updateOne({_id: req.body.id},
        { $set:
            {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                urlPhoto: req.body.urlPhoto,
                dateDeNaissance: req.body.dateDeNaissance,
                createdBy: decodedToken.id
            }
        })
        .then(agent=> res.json({agent}))
        .catch(errors=> res.json({errors}))
    
})


module.exports = router