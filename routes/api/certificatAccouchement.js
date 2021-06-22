const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Medicament = require('../../models/medicament')
const auth = require('../../middleware/auth')
const CertificatAccouchement = require('../../models/certificatAccouchement')


// ajouter un certificat d'accouchement
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newCertificatAccouchement= new CertificatAccouchement({
        
        profession: req.body.profession,
        mle: req.body.mle,
        dateAccouchement: req.body.dateAccouchement,
        sexe: req.body.sexe,
        prenom: req.body.prenom,
        pere: req.body.pere,
        createdBy: decodedToken.id,
        patient: req.body.patient
    })

    newCertificatAccouchement.save()
    .then(response=> res.json( response))
    .catch(errors=> res.json({errors}))
})

// charger les certificats d'accouchement d'un patient

router.post('/', auth, (req, res)=>{
    CertificatAccouchement.find({patient: req.body.patient})
    .then(response=> res.json( response))
    .catch(errors=> res.json({errors}))
})

module.exports = router