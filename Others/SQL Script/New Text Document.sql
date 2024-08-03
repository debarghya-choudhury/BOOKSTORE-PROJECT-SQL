-- Drop the database if it exists
DROP DATABASE IF EXISTS bookstore;

-- Create a new database
CREATE DATABASE bookstore;

-- Use the newly created database
USE bookstore;

-- Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Books table
CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL
);

-- Insert Dummy Data into Books Table
INSERT INTO Books (title, author, price) VALUES
('To Kill a Mockingbird', 'Harper Lee', 10.99),
('1984', 'George Orwell', 8.99),
('The Great Gatsby', 'F. Scott Fitzgerald', 12.49),
('The Catcher in the Rye', 'J.D. Salinger', 9.99),
('Moby Dick', 'Herman Melville', 11.49),
('Pride and Prejudice', 'Jane Austen', 7.99),
('The Hobbit', 'J.R.R. Tolkien', 14.99),
('Brave New World', 'Aldous Huxley', 13.49),
('The Lord of the Rings', 'J.R.R. Tolkien', 29.99),
('The Alchemist', 'Paulo Coelho', 8.49);

-- Cart table
CREATE TABLE Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Cart_Items table
CREATE TABLE Cart_Items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    book_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- Orders table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Order_Items table
CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    book_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);
