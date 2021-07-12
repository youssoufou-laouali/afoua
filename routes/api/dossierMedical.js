const express = require('express')
const router= express.Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const Dossier = require('../../models/dossier')
const auth = require('../../middleware/auth')

//ajouter un dossier
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newDossier= new Dossier({
        sexe: req.body.sexe,
        adresse: req.body.adresse,
        assure: req.body.assure,
        numPolice: req.body.numPolice,
        numAssure: req.body.numAssure,
        entree: req.body.entree,
        sortie: req.body.sortie,
        chambre: req.body.chambre,
        motifConsultation: req.body.motifConsultation,
        histoireMaladie: req.body.histoireMaladie,
        medicale: req.body.medicale,
        chirurgical: req.body.chirurgical,
        gynecoObstetrique: req.body.gynecoObstetrique,
        familiers: req.body.familiers,
        examenEntree: req.body.examenEntree,
        t: req.body.t,
        ta: req.body.ta,
        poids: req.body.poids,
        etatGeneral: req.body.etatGeneral,
        coeur: req.body.coeur,
        poumons: req.body.poumons,
        abd: req.body.abd,
        orl: req.body.orl,
        autresApp: req.body.autresApp,
        resume: req.body.resume,
        examenDemandes: req.body.examenDemandes,
        diagnosticRetenu: req.body.diagnosticRetenu,
        conduiteTenir: req.body.conduiteTenir,
        examensUlterieurs: req.body.examensUlterieurs,
        observations: req.body.observations,
        createdBy: decodedToken.id,
        patient: req.body.patient,
    })

    newDossier.save()
        .then(response=> res.json(response))
        .catch(errors=> res.json({errors}))
})

// Charger les dossier d'un patient
router.post('/', auth, (req, res)=>{
    Dossier.find({patient: req.body.id})
        .populate('patient')
        .then(response=> res.json(response))
        .catch(errors=> res.json({errors}))
})

//Modifier les Dossier 
router.patch('/', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');
    Dossier.findByIdAndUpdate(req.body.id, {
        $set: {
            ...req.body
        }
    })
    .then(response=> res.json(response))
    .catch(errors=> res.json({errors}))
    

})

module.exports = router