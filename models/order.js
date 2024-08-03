const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Order model
const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {  
    type: DataTypes.DECIMAL(10, 2),  
    allowNull: false,
    defaultValue: 0.00, 
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'Orders',
  timestamps: false, 
});

// associations
Order.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

module.exports = Order;
