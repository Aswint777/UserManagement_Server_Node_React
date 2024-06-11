// const mongoose = require("mongoose");
// require("dotenv").config();

// const MONGODB_URL = process.env.MONGODB_URL;

// mongoose
//   .connect(MONGODB_URL)
//   .then(() => {
//     console.log("working");
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });


// module.exports = mongoose;


const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.MONGODB_URL);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
