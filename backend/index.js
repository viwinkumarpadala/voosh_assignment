const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./UserRouter');
const OrderRouter = require('./OrderRouter');
const dotenv= require('dotenv')
const cookieParser=require('cookie-parser')
const cors= require('cors')

const app = express();

dotenv.config();
const DB_URL=process.env.DB_URL
const PORT = process.env.PORT || 3000;
 
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin:"https://voosh-assignment-viwin.vercel.app/",credentials:true}));
const allowedOrigins = ['https://voosh-assignment-viwin.vercel.app'];

// Configure CORS options
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Enable credentials
};

// Enable CORS middleware
app.use(cors(corsOptions));

// Enable CORS middleware
app.use(cors(corsOptions));
mongoose.connect(DB_URL, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use('/user', UserRouter);
app.use('/order', OrderRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
