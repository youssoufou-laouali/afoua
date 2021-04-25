const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Medicament = require('../../models/medicament')
const auth = require('../../middleware/auth')
const AvisHospitalisation = require('../../models/avisHospitalisation')


//ajouter un avis d'hospitalisation
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newAvisHospitalisation = new AvisHospitalisation({
        createdBy: decodedToken.id,
        patient: req.body.id,
        assurance: req.body.assurance,
        numAssure: req.body.numAssure,
        nomAssure: req.body.nomAssure,
        societe: req.body.societe,
        diagnosticCliniqueEntree: req.body.diagnosticCliniqueEntree,
        dateHospitalisation: req.body.dateHospitalisation,
        dureeHospitalisation: req.body.dureeHospitalisation,
    })

    newAvisHospitalisation.save()
    .then(response=> res.json({avisHospitalisation: response}))
    .catch(errors=> res.json({errors}))
})


//charger tous avis d'hospitalisation d'un patient
router.post('/', auth, (req, res)=>{
    AvisHospitalisation.find({patient: req.body.patient})
    .then(response=> res.json({avisHospitalisation: response}))
    .catch(errors=> res.json({errors}))
})


module.exports= router