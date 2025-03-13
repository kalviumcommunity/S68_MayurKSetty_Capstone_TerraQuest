const UserModel = require('../Model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//user manipulation

const getOne = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ Message: "All fields are required." });
        console.log("All the fields are necessary!");
        return;
    }

    try {
        const userexist = await UserModel.findOne({ email: email });

        if (!userexist) {
            return res.status(404).json({ Message: "The user could not be found!" });
        }

        res.status(200).json({ Message: "User Found!", Userdata: userexist });
    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({ Message: "There was a server error." });
    }
};

const postOne = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ Message: "All fields are required." });
        console.log("All the fields are necessary!");
        return;
    }

    try {
        const userexist = await UserModel.findOne({ email: email });
        if (userexist) {
            return res.status(400).json({ Message: "The user already exists! Please go to login..." });
        }

        // Hashing of the password before storing it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createuser = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword, // Storing the hashed password
        });

        res.status(201).json({ Message: "Created the user!", userdata: createuser });
    } catch (err) {
        res.status(500).json({ Message: "There was an error while creating the user", error: err });
    }
};


//loggingof the user in platform
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.password) {
            return res.status(400).json({ message: "This account does not have a password. Try social login." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in the environment variables.");
            return res.status(500).json({ message: "Server error: Missing JWT secret" });
        }

        // Generation of the Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // token is set in the response headers
        res.setHeader("Authorization", `Bearer ${token}`);

        res.status(200).json({ //success
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {//error
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// put request for editing any of the user fields
const editOne = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.params; 
        console.log(userId);

        let user = await UserModel.findById(userId.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (email && email !== user.email) {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already in use" });
            }
            user.email = email;
        }
        if (name) user.name = name;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
};



module.exports = {getOne,postOne,editOne,login};
