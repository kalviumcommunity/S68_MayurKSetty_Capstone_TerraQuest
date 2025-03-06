const express = require('express');
const {getOne, postOne, editOne, login} = require('../Control/Controller');
const router = express.Router()

//middleware
const authMiddleware = require('../Middleware/AuthMiddleware');

router.get('/getone',getOne);
router.post('/signup',postOne);
router.post('/login',login)
router.put('/edituser/:id',editOne);

module.exports = router;