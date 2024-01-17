const express = require('express');
const router = express.Router();

const {signup} = require('../controller/signup.controller');
const {login}= require('../controller/login.controller');

const {auth, isStudent, isAdmin}=require('../middleware/auth.middleware')

router.post('/signup', signup);
router.post('/login', login);

router.get('/test', auth, (req, res)=>{
    res.status(200).json({
        message:"Test passed"
    })
})

router.get('/student', auth, isStudent, async(req, res)=>{
    res.status(200).json({
        message:"Student Dashboard"
    })
})
router.get('/admin', auth, isAdmin, async(req, res)=>{
    res.status(200).json({
        message:"Admin Dashboard"
    })
})

module.exports = router;