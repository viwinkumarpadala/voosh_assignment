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

        if (check2) {
            return res.status(500).json({ message: 'Phone number already exists, check your Phone number' });
        }

        const user = new User({
            username: name,
            phoneNumber: phoneNumber,
            password: hashedPassword
        });
    
        await user.save();

        const Token = jwt.sign({ userId: user.username }, 'your_secret_key', { expiresIn: '1h' });

        const refreshToken = jwt.sign({ userId: user.username }, 'your_second_secret_key', { expiresIn: '24h' });
        
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        };

        res.status(201).cookie("token",Token,options).json({ message: 'User created successfully', Token: Token, refreshToken: refreshToken });
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

        const Token = jwt.sign({ userId: user.username}, 'your_secret_key', { expiresIn: '1h' });

        const refreshToken = jwt.sign({ userId: user.username }, 'your_refresh_token_secret', { expiresIn: '24h' });
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        };

        res.status(200).cookie("token", Token, options).json({message:"User logged in succesfully!", Token: Token, refreshToken: refreshToken });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/refresh-token', (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        jwt.verify(refreshToken, 'your_refresh_token_secret', (err, user) => {
            if (err) return res.sendStatus(403);

            const accessToken = generateAccessToken({ userId: user.userId });
            res.json({ accessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
