const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const certificatVisiteContreVisite = require('../../models/certificatVisiteContreVisite')


// ajouter un certificat de visite et contre visite Medical
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    if(req.body.id){
        
        certificatVisiteContreVisite.findByIdAndUpdate(req.body.id,{
            justification2: req.body.justification2,
            createdBy2: decodedToken.id,
        })
        .then(response=> res.json({certificatVisiteContreVisite: response}))
        .catch(errors=> res.json({errors}))
    }else{
        const newCertificatVisiteContreVisite= new certificatVisiteContreVisite({
            createdBy: decodedToken.id,
            patient: req.body.patient,
            justification1: req.body.justification1
        })
    
        newCertificatVisiteContreVisite.save()
        .then(response=> res.json({certificatVisiteContreVisite: response}))
        .catch(errors=> res.json({errors}))
    }

})

// charger les certificats de visite et contre visite  medical d'un patient

router.post('/', auth, (req, res)=>{
    certificatVisiteContreVisite.find({patient: req.body.patient})
    .then(response=> res.json({certificatVisiteEtContreVisiteMedicale: response}))
    .catch(errors=> res.json({errors}))
})

module.exports = router