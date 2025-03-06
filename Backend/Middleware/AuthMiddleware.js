const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        // Ensure Authorization header exists
        const tokenauth = req.headers.authorization; // Correct spelling & lowercase
        if (!tokenauth || !tokenauth.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied, no token provided" });
        }

        // Extract the token
        const token = tokenauth.split(" ")[1];

        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user ID to request

        next(); // Continue to the next
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;

