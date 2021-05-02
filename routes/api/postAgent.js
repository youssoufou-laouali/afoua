const express = require('express')
const router= express.Router()
const PostAgent = require('../../models/postAgent')

router.get('/', (req, res)=>{
    PostAgent.find()
    .then(posts=> res.json(posts))
    .catch(errors=> res.json(errors))
})

router.post('/add', (req, res)=>{
    PostAgent.findById(req.body.id)
    .then(post=>{
        console.log(post);
        post.posts.unshift(req.body.post)
        post.save()
        .then(response=>res.json(response))
        .catch(errors=> res.json(errors))
    })
    .catch(errors=> res.json({errors}))
})

router.post('/addfirst', (req, res)=>{
   let newPost= new PostAgent({
       post:[]
   })

   newPost.save()
   .then(response=> res.json({response}))
   .catch(errors=> res.json({errors}))

})

module.exports = router