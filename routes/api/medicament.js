const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const Medicament = require('../../models/medicament')
const auth = require('../../middleware/auth')


//Enregistrer un medicament 
router.post('/add', auth, (req, res)=>{
    if(!req.body.name){
        return res.json({errors: 'ajouter un medicament'})
    }
    const newMedicament = new Medicament({
        name: req.body.name,
        dosage: req.body.dosage,
        quantite: req.body.quantite,
        prise: req.body.prise,
        delai: req.body.delai
    })

    newMedicament.save()
    .then(medicament=> res.json({medicament}))
    .catch(errors=> res.json({errors}))
})


// Charger les medicaments
router.get('/', auth, (req, res)=>{
    Medicament.find()
    .then(medicaments=> res.json({medicaments}))
    .catch(errors=> res.json({errors}))
})

module.exports = router