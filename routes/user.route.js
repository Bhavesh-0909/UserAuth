const express = require('express');
const router = express.Router();

const {signup} = require('../controller/signup.controller');
const {login}= require('../controller/login.controller')

router.post('/signup', signup);
router.post('/login', login)

module.exports = router;