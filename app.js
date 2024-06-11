// const express = require('express')
// const mongoose = require("mongoose");
// require('dotenv').config()
// const path = require('path')
// // require('./database/db')


// const app = express()

// // const userRouter = require('./router/userRouter')
// // const adminRouter = require('./router/adminRouter')
// // app.use('/',userRouter)
// // app.use('/admin',adminRouter)


// // 
// const MONGODB_URL = process.env.MONGODB_URL;

// mongoose
//   .connect(MONGODB_URL)
//   .then(() => {
//     console.log("working");
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });

//   const userSchema = new mongoose.Schema({
//     name : String,
//     age : Number
//   })

//   const userModel = mongoose.model('userData',userSchema)

// //   const data = userModel.insertOne({name:"babu", age : 12})

//   app.get('/getUser',async(req,res)=>{
//     const userData = await userModel.find()
//     res.json(userData)
//   })
// // 

// const PORT = process.env.PORT

// app.listen(PORT,()=>{
//     console.log(`Server running at http://localhost:${PORT}/`)
// })

const express = require('express');
require('dotenv').config();
const connectDB = require('./database/db');
const path = require('path');
const cors=require('cors')
// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

//cors setting
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
  origin: [allowedOrigins],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Import routers
const userRouter = require('./router/userRouter');
const adminRouter = require('./router/adminRouter');

// Use routers
app.use('/', userRouter);
app.use('/admin', adminRouter);

// Default route
app.get('/', (req, res) => {
    res.send('The server is running');
});

// Start the server after ensuring the database connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
