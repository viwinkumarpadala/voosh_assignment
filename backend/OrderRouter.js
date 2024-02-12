const express = require('express');
const router = express.Router();
const Order = require('./model/Order'); // Import Order model
const User =  require('./model/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    // const token = req.headers['authorization'];
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        // const decoded = jwt.verify(token, 'your_secret_key');
        // req.userId = decoded.userId;
        // next();
        // if (!token) {
        //     return next(new ErrorHandler("Please Login to access this resource", 401));
        // }

        const decoded = jwt.verify(token, "your_secret_key");

        req.userId = decoded.userId;

        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

// Add Order Route
router.post('/add-order', verifyToken, async (req, res) => { 
    try {
        // Extract order data from request body
        const { subTotal, phoneNumber, userId } = req.body;
        console.log(req.body)

        const user =await User.findOne({username:userId});
        if(!user){
            return res.status(201).json({ message: 'Order not added, User does not exist!' });
        }
        // console.log(user)

        const order = new Order({
            username: userId,
            subtotal: subTotal,
            phoneNumber: phoneNumber
        });
        
        await order.save();
        return res.status(201).json({ message: 'Order added successfully' }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// View Orders Route
router.get('/get-order', verifyToken, async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log(req.body)
        const user = await User.findOne({ username: userId });

        if (!user) {
            return res.status(201).json({ message: 'User does not exist!' }); 
        }
        const orders = await Order.find({ username:userId });

        return res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
