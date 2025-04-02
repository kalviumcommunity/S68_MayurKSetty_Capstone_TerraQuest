const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return !this.isOAuthUser; } }, // Optional for OAuth users
  isOAuthUser: { type: Boolean, default: false }
});

const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;
