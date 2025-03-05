const mongoose = require('mongoose');

const ConnectDB = async (url) => {
    try{
        await mongoose.connect(url);
        console.log("Connected to MongoDB Atlas");
    }
    catch(err){
        console.log("There was an error connecting to Atlas...", err);
    }
}

module.exports = ConnectDB;