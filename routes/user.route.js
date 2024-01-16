const express = require('express');
const router = express.Router();

const {createUser} = require('../controller/createUser.controller');

router.post('/createUser', createUser);

module.exports = router;