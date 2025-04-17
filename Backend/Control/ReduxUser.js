const jwt = require('jsonwebtoken');
const User = require('../Model/UserSchema');

const reduxget = async (req, res) => {
  const userId = req.user;
  if (!userId) {
    res.status(400).json({ Msg: 'Please log in!' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ Msg: 'The user does not exist!' });
    }
    res.status(200).json({ Msg: 'Found the user!', user: user });
  } catch (err) {
    res.status(401).json({ message: 'Internal error!' });
  }
};

module.exports = reduxget;
