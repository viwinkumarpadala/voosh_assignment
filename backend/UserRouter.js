const express = require('express');
const router = express.Router();
const User = require('./model/User'); // Import User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// User Signup Route
router.post('/add-user', async (req, res) => {
    try {
        const { name, phoneNumber, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(req.body)

        const check1 = await User.findOne({ username: name });
        console.log(check1)

        if (check1) {
            return res.status(500).json({ message: 'Username already exists, check your user name' });
        }

        const check2 = await User.findOne({ phoneNumber: phoneNumber });
        console.log(check2);
        if (check2) {
            return res.status(500).json({ message: 'Phone number already exists, check your Phone number' });
        }

        const user = new User({
            username: name,
            phoneNumber: phoneNumber,
            password: hashedPassword
        });
    
        await user.save();

        const Token = jwt.sign({ userId: user.username, phno: user.phoneNumber }, 'your_secret_key', { expiresIn: 15 * 24 * 60 * 60 * 1000 });

        const options = {
            expires: new Date(
                Date.now() +15* 24 * 60 * 60 * 1000
            ),
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        };

        res.status(201).cookie("token",Token,options).json({ message: 'User created successfully', Token: Token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login Route
router.post('/login-user', async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const Token = jwt.sign({ userId: user.username, phno: user.phoneNumber }, 'your_secret_key', { expiresIn: 15* 24 * 60 * 60 * 1000 });

        const options = {
            expires: new Date(
                Date.now() + 15* 24 * 60 * 60 * 1000
            ),
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        };

        res.status(200).cookie("token", Token, options).json({message:"User logged in succesfully!", Token: Token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); 
    }
});

router.get('/logout',(req,res)=>{
    try{
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

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
