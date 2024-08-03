const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./cart');
const Book = require('./book');

// CartItem model
const CartItem = sequelize.define('CartItem', {
  cart_item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Cart_Items',
  timestamps: false,
});

// associations
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Book, { foreignKey: 'book_id' });
Book.hasMany(CartItem, { foreignKey: 'book_id' });

module.exports = CartItem;
