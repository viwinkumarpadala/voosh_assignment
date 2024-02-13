const express = require('express');
const router = express.Router();
const Order = require('./model/Order'); // Import Order model
const User =  require('./model/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    // const token = req.headers['authorization'];
    const { token } = req.cookies;

    console.log(req.cookies)
    // console.log(req)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {

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
        const userId = req.query.userId; // Use req.query to get parameters from GET request
        console.log(userId);
        const user = await User.findOne({ username: userId });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist!' });
        }
        const orders = await Order.find({ username: userId });

        return res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const orderId = req.params.id;
        console.log(orderId);

        // Find the order by ID and delete it
        await Order.findByIdAndDelete(orderId);

        // Send a success response
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        // Send an error response if deletion fails
        res.status(500).json({ message: 'Failed to delete order' });
    }
});


module.exports = router;
