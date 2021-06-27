const express = require('express')
const router= express.Router()
const jwt= require('jsonwebtoken')
const auth = require('../../middleware/auth')
const Infirmiere= require('../../models/infirmiere')

router.post('/add', auth, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');

    const newElement= new Infirmiere({
        createdBy: decodedToken.id,
       ...req.body
    })

    newElement.save()
    .then(response=> res.json(response))
    .catch(errors=> res.json({errors}))

})


router.get('/', auth, (req, res)=>{
    Infirmiere.find({patient: req.body.id})
    .then(response=> res.json(response))
    .catch(errors=> res.json({errors}))
})

module.exports = router