const express = require('express')
const router= express.Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const BilletDeSortie = require('../../models/billetDeSortie')
const auth = require('../../middleware/auth')

//ajouter un billet de sortie
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newBilletDeSortie= new BilletDeSortie({
        visiteRetour: req.body.visiteRetour,
        ordonnanceSortie: req.body.ordonnanceSortie,
        dateSortie: req.body.dateSortie,
        diagnosticRetenu: req.body.diagnosticRetenu,
        dureeHospitalisation: req.body.dureeHospitalisation,
        finPeriode: req.body.finPeriode,
        debutPeriode: req.body.debutPeriode,
        createdBy: decodedToken.id,
        patient: req.body.id,
        motifHospitalisation: req.body.motifHospitalisation
    })

    newBilletDeSortie.save()
        .then(response=> res.json({billetSortie: response}))
        .catch(errors=> res.json({errors}))
})

// Charger les billets de sortie d'un patient
router.get('/', auth, (req, res)=>{
    BilletDeSortie.find({patient: req.body.id})
        .populate('patient')
        .then(response=> res.json({billetSortie: response}))
        .catch(errors=> res.json({errors}))
})

module.exports = router