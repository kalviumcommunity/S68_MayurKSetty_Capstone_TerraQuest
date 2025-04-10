const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    // Verifying the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;

    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = AuthMiddleware;
