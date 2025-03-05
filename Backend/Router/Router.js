const express = require('express');
const getOne = require('../Control/Controller');
const router = express.Router()

router.get('/getone',getOne);

module.exports = router;