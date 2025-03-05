const UserModel = require('../Model/UserSchema');

const getOne = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
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

module.exports = getOne;
