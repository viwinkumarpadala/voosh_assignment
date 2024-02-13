//  Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./UserRouter');
const OrderRouter = require('./OrderRouter');
const dotenv= require('dotenv')
const cookieParser=require('cookie-parser')
const cors= require('cors')
const app = express();

//  Use dotenv variables
dotenv.config();

const DB_URL=process.env.DB_URL
const PORT = process.env.PORT || 5000;
 
// Using middlewares 
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['https://voosh-assignment-viwin.vercel.app','http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true 
};
app.use(cors(corsOptions));

// Connect to Mongodb database
mongoose.connect(DB_URL, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Defining routers
app.use('/user', UserRouter);
app.use('/order', OrderRouter);

//  listening to port 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
