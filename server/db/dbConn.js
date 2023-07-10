const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('MongoDB connecting...');
        mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("MongoDB database connection established successfully");
        });
    } catch (err) {
        console.error("Error: " + err.message);
    }
}

module.exports = connectDB;