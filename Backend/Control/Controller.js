const UserModel = require('../Model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const 

module.exports = {getOne, postOne};
