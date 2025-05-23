// generic imports
const UserModel = require('../Model/UserSchema');
const SightingModel = require('../Model/SightingSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//google imports
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

// cloudinary imports
const cloudinary = require('../Cloudinary/CloudinaryConfig');
const fs = require('fs');
const cloudinaryupload = require('../Cloudinary/CloudinaryUpload');
const CloudinaryUpload = require('../Cloudinary/CloudinaryUpload');

// google authentication endpoints...

passport.use(
  //
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await UserModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            isOAuthUser: true, // Mark as OAuth user
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize & Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Login Route
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleCallback = passport.authenticate('google', { failureRedirect: '/' });

const googleRedirect = async (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    // res.redirect(`http://localhost:5173?token=${token}`);
    res.status(200).json({ Message: 'logged in using Google!' });
    console.log('successfully logged in using google auth');
  } catch (error) {
    console.error('Google Authentication Error:', error);
    res.status(500).json({ message: 'Google authentication failed', error });
  }
};

//user manipulation

const getOne = async (req, res) => {
  const userId = req.user;

  if (!userId) {
    res.status(400).json({ Message: 'All fields are required.' });
    console.log('All the fields are necessary!');
    return;
  }

  try {
    const userexist = await UserModel.findById(userId);

    if (!userexist) {
      return res.status(404).json({ Message: 'The user could not be found!' });
    }

    res.status(200).json({ Message: 'User Found!', Userdata: userexist });
  } catch (err) {
    console.error('Error finding user:', err);
    res.status(500).json({ Message: 'There was a server error.' });
  }
};

const postOne = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ Message: 'All fields are required.' });
    console.log('All the fields are necessary!');
    return;
  }

  try {
    const userexist = await UserModel.findOne({ email: email });
    if (userexist) {
      return res.status(400).json({ Message: 'The user already exists! Please go to login...' });
    }

    // Hashing of the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createuser = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword, // Storing the hashed password
    });

    res.status(201).json({ Message: 'Created the user!', userdata: createuser });
  } catch (err) {
    res.status(500).json({ Message: 'There was an error while creating the user', error: err });
  }
};

//loggingof the user in platform
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.password) {
      return res.status(400).json({ message: "couldn't find a password for this account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in the environment variables.');
      return res.status(500).json({ message: 'Server error: Missing JWT secret' });
    }

    // Generation of the Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, //1h
    });

    res.status(200).json({
      //success
      message: 'Login successful',
      token,
      user: { ...user._doc },
    });
    console.log('success');
  } catch (error) {
    //error
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logout

const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ message: 'Logged out successfully' });
};

// put request for editing any of the user fields
const editOne = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user;
    console.log(userId);

    let user = await UserModel.findById(userId.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (email && email !== user.email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
      user.email = email;
    }
    if (name) user.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

//getting one perticular user

const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userexist = await UserModel.findById(id);
    if (!userexist) {
      return res.status(404).json({ Msg: 'The user does not exist!' });
    }
    res.status(200).json(userexist);
  } catch (err) {
    res.status(500).json({ Msg: 'There seems to be a internal server error', error: err });
  }
};

// Cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      console.log('No file received', req.file);
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'TerraQuest',
    });
    console.log(result);

    try {
      fs.unlinkSync(req.file.path); //deleting locally
      console.log('deleted the file locally');
    } catch (err) {
      console.log('There was an error delteting image locally', err);
    }

    //finding updating the newly created url using the usermodel
    const userId = req.user;
    const updatedprofile = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { profilePic: result.secure_url },
      { new: true }
    );

    console.log('Updated profile:', updatedprofile);

    res.json({ url: result.secure_url, profile: updatedprofile });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// submitting sighting
const CreateSighting = async (req, res) => {
  const { locationVisibility, latitude, longitude, timeOfDay, creatureGuess } = req.body;
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ Error: 'No media has been uploaded!' });
  }
  try {
    const photoURLs = await CloudinaryUpload(req.files, 'TerraQuest/Sightings');

    if (!photoURLs) {
      return res.status(500).json({ Error: 'There was an error uploading using cloudinary!' });
    }

    const newsight = await SightingModel.create({
      locationVisibility,
      latitude,
      longitude,
      timeOfDay,
      creatureGuess,
      photoURLs,
      userId: req.user,
    });
    res.status(201).json({ msg: 'Successfully submitted sighting!', sighting: newsight });
  } catch (err) {
    res.status(500).json({ Msg: 'There was an internal server error', error: err });
  }
};

const fetchAllSighting = async (req, res) => {
  try {
    const response = await SightingModel.find();
    if (!response) {
      return res.status(404).json({ Msg: 'No data could be found!' });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ Msg: 'There was an error fetching the data from atlas!', error: err });
  }
};

module.exports = {
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
};
