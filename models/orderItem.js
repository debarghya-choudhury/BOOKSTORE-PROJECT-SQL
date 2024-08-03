const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./order'); 
const Book = require('./book'); 

// OrderItem model
const OrderItem = sequelize.define('OrderItem', {
  order_item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
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
  tableName: 'Order_Items',
  timestamps: false, 
});

// associations
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Book, { foreignKey: 'book_id' });
Book.hasMany(OrderItem, { foreignKey: 'book_id' });

module.exports = OrderItem;
