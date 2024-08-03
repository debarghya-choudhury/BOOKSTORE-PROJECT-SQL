const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Book = require('../models/book');
const sequelize = require('../config/database');

// Place an order from the cart
exports.placeOrder = async (req, res) => {
    console.log("API HITTING: placeOrder");
    try {
        const cart = await Cart.findOne({ where: { user_id: req.userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItems = await CartItem.findAll({
            where: { cart_id: cart.cart_id },
            include: { model: Book, attributes: ['price'] }
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        console.log(JSON.stringify(cartItems))

        let totalPrice = cartItems.reduce((total, item) => {
            // console.log(item.dataValues)
            if (!item.Book) {
                throw new Error(`Invalid book data for book_id ${item.book_id}`);
            }
            return (total + (item.quantity * (+item.Book.price)));
        }, 0);
        // console.log(totalPrice)
        totalPrice = totalPrice.toFixed(2);

        const order = await Order.create({ user_id: req.userId, total_price: totalPrice });

        await Promise.all(cartItems.map(item => {
            return OrderItem.create({ order_id: order.order_id, book_id: item.book_id, quantity: item.quantity });
        }));

        // await CartItem.destroy({ where: { cart_id: cart.cart_id } });

        // Clear cart items
        await CartItem.destroy({ where: { cart_id: cart.cart_id } });

        // Reset the auto-increment value for cart_item_id
        await sequelize.query('ALTER TABLE cart_items AUTO_INCREMENT = 1;');

        res.status(201).json(order);
    } catch (error) {
        console.error('Error placing order:', error); 
        res.status(500).json({ message: 'Error placing order', error });
    }
};



// View order history for the authenticated user
exports.getOrderHistory = async (req, res) => {
    console.log("API HITTING: getOrderHistory")
    try {
        const orders = await Order.findAll({ where: { user_id: req.userId } });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order history', error });
    }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
    console.log("API HITTING: getOrderDetails")
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const orderItems = await OrderItem.findAll({ where: { order_id: id }, include: [Book] });
        res.json({ order, items: orderItems });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error });
    }
};
