//  Import required libraries
const express = require('express');
const router = express.Router();
const User = require('./model/User'); // Import User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// User Signup Route
router.post('/add-user', async (req, res) => {
    try {
        // Get the reuirements by parsing the request body
        const { name, phoneNumber, password } = req.body
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(req.body)
        // Check if the user with this username already exists(it should be unique)
        const check1 = await User.findOne({ username: name });
        console.log(check1)

        if (check1) {
            return res.status(500).json({ message: 'Username already exists, check your user name' });
        }
        // Check if the user with this phonenumber already exists(it should be unique)
        const check2 = await User.findOne({ phoneNumber: phoneNumber });
        console.log(check2);
        if (check2) {
            return res.status(500).json({ message: 'Phone number already exists, check your Phone number' });
        }
        // If not then create a user and store it in DB
        const user = new User({
            username: name,
            phoneNumber: phoneNumber,
            password: hashedPassword
        });
    
        await user.save();
        // Creating a jwt token and storing it as a cookie in the frontend with an expiry date of 15 days
        const Token = jwt.sign({ userId: user.username, phno: user.phoneNumber }, 'your_secret_key', { expiresIn: 15 * 24 * 60 * 60 * 1000 });

        const options = {
            expires: new Date(
                Date.now() +15* 24 * 60 * 60 * 1000
            ),
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        };
        // User created succesfully
        res.status(201).cookie("token",Token,options).json({ message: 'User created successfully', Token: Token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login Route
router.post('/login-user', async (req, res) => {
    try {
        // Get the reuirements by parsing the request body
        const { phoneNumber, password } = req.body;
        // Check if user exists or not
        const user = await User.findOne({ phoneNumber });
        // If not exists then return
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is valid or not
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // If not sae return
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Creating a jwt token and storing it as a cookie in the frontend with an expiry date of 15 days
        const Token = jwt.sign({ userId: user.username, phno: user.phoneNumber }, 'your_secret_key', { expiresIn: 15* 24 * 60 * 60 * 1000 });

        const options = {
            expires: new Date(
                Date.now() + 15* 24 * 60 * 60 * 1000
            ),
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        };
        // User logged in succesfully
        res.status(200).cookie("token", Token, options).json({message:"User logged in succesfully!", Token: Token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); 
    }
});
// User logout route
router.get('/logout',(req,res)=>{
    try{
        // Expiring the cookie
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        // Logging out the user
        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
        console.log('logged out')
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})


module.exports = router;
