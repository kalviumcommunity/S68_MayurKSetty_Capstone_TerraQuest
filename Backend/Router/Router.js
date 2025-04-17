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
  fetchAllSighting,
  getOneUser,
  logoutUser,
} = require('../Control/Controller');
const router = express.Router();
const multer = require('multer');
const reduxget = require('../Control/ReduxUser');

//middleware
const AuthMiddleware = require('../Middleware/AuthMiddleware');

//user routes
router.get('/getuser', AuthMiddleware, getOne);
router.post('/signup', postOne);
router.post('/login', login);
router.put('/edituser/:id', editOne);
router.post('/logout', AuthMiddleware, logoutUser);

// getting user for generic use
router.get('/getOneUser/:id', getOneUser);

// google auth
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleCallback, googleRedirect);

//Cloudinary
const upload = multer({ dest: 'uploads/' });
router.post('/upload', AuthMiddleware, upload.single('image'), uploadImage);

// submissions
router.post('/submit', AuthMiddleware, upload.array('image', 5), CreateSighting);

//fetch data
router.get('/fetchsighting', fetchAllSighting);

//redux
router.get('/me', AuthMiddleware, reduxget);

module.exports = router;
