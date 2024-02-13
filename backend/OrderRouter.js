const express = require('express');
const router = express.Router();
const Order = require('./model/Order'); // Import Order model
const User =  require('./model/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    // Get the token from the cookies
    const { token } = req.cookies;

    console.log(req.cookies)
    // console.log(req)
    
    // If token doesn't exist then return missing token message 
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    // Verify the key
    try {

        const decoded = jwt.verify(token, "your_secret_key");

        req.userId = decoded.userId;

        next();
    // If not valid then catch and send the invalid token message
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
        // Verifying that the user exists before adding the order
        const user =await User.findOne({username:userId});
        // If not exists then return
        if(!user){
            return res.status(201).json({ message: 'Order not added, User does not exist!' });
        }
        // console.log(user)

        // Create the order
        const order = new Order({
            username: userId,
            subtotal: subTotal,
            phoneNumber: phoneNumber
        });
        // Save the order
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
        // Getting the user id from the route
        const userId = req.query.userId;
        console.log(userId);
        // Verifying the user id
        const user = await User.findOne({ username: userId });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist!' });
        }

        // Get all the order with that user id
        const orders = await Order.find({ username: userId });
        // Return the orders
        return res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Delete order route
router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        // Get the user id
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
