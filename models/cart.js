const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Cart model
const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'Cart',
  timestamps: false, 
});

// associations
Cart.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Cart, { foreignKey: 'user_id' });

module.exports = Cart;
