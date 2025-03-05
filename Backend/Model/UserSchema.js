const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    "name": {type: String, required: true},
    "email": {type:String, require: true, unique:true}
});

const UserModel = mongoose.model('UserModel',UserSchema);
module.exports = UserModel;