const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Cart = require('../models/cart');

// Register a new user
exports.register = async (req, res) => {
    console.log("API HITTING: register")
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error["errors"].map(obj => obj.message) });
    }
};

// Log in a user
exports.login = async (req, res) => {
    console.log("API HITTING: login")
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.user_id }, config.jwtSecret, { expiresIn: '1h' });
        
        // Check if cart exists for the user
        let cart = await Cart.findOne({ where: { user_id: user.user_id } });

        // If no cart exists, create one
        if (!cart) {
            cart = await Cart.create({ user_id: user.user_id });
        }
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error["errors"].map(obj => obj.message)  });
    }
};
