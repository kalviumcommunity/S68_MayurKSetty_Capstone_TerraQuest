const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.isOAuthUser;
    },
  }, // Optional for OAuth users
  profilePic:{type: String, default:"https://res.cloudinary.com/dh4zgual6/image/upload/v1743779736/user_1_vy5jcs.png"},
  isOAuthUser: { type: Boolean, default: false },
});

const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;
