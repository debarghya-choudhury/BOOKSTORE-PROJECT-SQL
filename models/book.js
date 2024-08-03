const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Book model
const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  tableName: 'Books',
  timestamps: false, 
});

module.exports = Book;
