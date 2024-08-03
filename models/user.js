const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// User model
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  tableName: 'Users',
  timestamps: false, 
});

module.exports = User;
