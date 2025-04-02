const express = require('express');
const {getOne, postOne, editOne, login, googleAuth, googleCallback, googleRedirect} = require('../Control/Controller');
const router = express.Router()

//middleware
const authMiddleware = require('../Middleware/AuthMiddleware');

//user routes
router.get('/getone',getOne);
router.post('/signup',postOne);
router.post('/login',login)
router.put('/edituser/:id',editOne);

// google auth
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback, googleRedirect);

module.exports = router;