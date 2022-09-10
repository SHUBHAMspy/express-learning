const express = require('express')
const router = express.Router()

router.get('/',(req,res) =>{
    res.render('index',{title:'My Express router',message:'Hello!! User Welcome To My Express router'})
})

router.get('/',(req,res) =>{
    res.sendFile('index.html',{root:__dirname})
})

module.exports = router
