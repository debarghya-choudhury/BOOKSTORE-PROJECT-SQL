const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Book = require('../models/book');

// Get cart details for the authenticated user
exports.getCartDetails = async (req, res) => {
    console.log("API HITTING: getCartDetails")
    try {
        const cart = await Cart.findOne({ where: { user_id: req.userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const items = await CartItem.findAll({ where: { cart_id: cart.cart_id }, include: [Book] });
        res.json({ cart, items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart details', error });
    }
};

// Add a book to the cart
exports.addToCart = async (req, res) => {
    console.log("API HITTING: addToCart")
    const { book_id, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ where: { user_id: req.userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const book = await Book.findOne({ where: { book_id } });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const cartItem = await CartItem.create({ cart_id: cart.cart_id, book_id, quantity });
        // console.log(cartItem)
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding book to cart', error });
    }
};

// Remove a book from the cart
exports.removeFromCart = async (req, res) => {
    console.log("API HITTING: removeFromCart");
    const { itemId } = req.params;

    try {
        const item = await CartItem.findOne({ where: { cart_item_id: itemId } });

        if (!item) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await CartItem.destroy({ where: { cart_item_id: itemId } });
        res.status(204).send(); 
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

