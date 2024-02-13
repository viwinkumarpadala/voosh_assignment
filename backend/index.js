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
app.use(cors({ origin:"https://voosh-assignment-viwin.vercel.app/",credentials:true}));

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
