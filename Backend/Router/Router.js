const express = require('express');
const {getOne, postOne} = require('../Control/Controller');
const router = express.Router()

router.get('/getone',getOne);
router.post('/signup',postOne);

module.exports = router;