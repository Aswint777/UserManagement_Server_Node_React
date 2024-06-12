

const express = require('express');
require('dotenv').config();
const connectDB = require('./database/db');
const path = require('path');
const cors=require('cors')
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());


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
