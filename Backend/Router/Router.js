const express = require('express');
const {
  getOne,
  postOne,
  editOne,
  login,
  googleAuth,
  googleCallback,
  googleRedirect,
  uploadImage,
  CreateSighting,
} = require('../Control/Controller');
const router = express.Router();
const multer = require('multer');

//middleware
const AuthMiddleware = require('../Middleware/AuthMiddleware');

//user routes
router.get('/getuser', AuthMiddleware, getOne);
router.post('/signup', postOne);
router.post('/login', login);
router.put('/edituser/:id', editOne);

// google auth
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleCallback, googleRedirect);

//Cloudinary
const upload = multer({ dest: 'uploads/' });
router.post('/upload', AuthMiddleware, upload.single('image'), uploadImage);

// submissions
router.post('/submit', AuthMiddleware, upload.array('image', 5), CreateSighting);

module.exports = router;
