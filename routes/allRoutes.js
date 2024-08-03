const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/userController');
const { listBooks, getBookDetails } = require('../controllers/bookController');
const { getCartDetails, addToCart, removeFromCart } = require('../controllers/cartController');
const { placeOrder, getOrderHistory, getOrderDetails } = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');

// Authentication Routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Book Routes
router.get('/books', listBooks);
router.get('/books/:id', getBookDetails);

// Cart Routes
router.get('/cart', authenticate, getCartDetails);
router.post('/cart', authenticate, addToCart);
router.delete('/cart/:itemId', authenticate, removeFromCart);

// Order Routes
router.post('/orders', authenticate, placeOrder);
router.get('/orders', authenticate, getOrderHistory);
router.get('/orders/:id', authenticate, getOrderDetails);

module.exports = router;
