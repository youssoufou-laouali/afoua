const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const EchoVesicoProstatique= require('../../models/echoVesicoProstatique')
//Ajouter un echo Prostatique pour un patient
router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new EchoVesicoProstatique({
        createdBy: decodedToken.id,
        patient: req.body.id,
        renseignementClinique: req.body.renseignementClinique,
        prostate: req.body.prostate,
        vesiculeSeminale: req.body.vesiculeSeminale,
        vessie: req.body.vessie,
        volumeVesical: req.body.volumeVesical,
        paroisVesicale: req.body.paroisVesicale,
        residuPostMictionnel: req.body.residuPostMictionnel,
        reins: req.body.reins,
        conclusion: req.body.conclusion,
    })

    newElement.save()
    .then(response=> res.json({cra: response}))
    .catch(errors=> res.json({errors}))

})


router.get('/', auth, (req, res)=>{
    EchoVesicoProstatique.find({patient: req.body.id})
    .then(response=> res.json(response))
    .catch(errors=> res.json({errors}))
})

module.exports = router