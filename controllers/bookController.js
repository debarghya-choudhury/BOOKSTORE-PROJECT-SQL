const Book = require('../models/book');

// List all books
exports.listBooks = async (req, res) => {
    console.log("API HITTING: listBooks")
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

// Get book details
exports.getBookDetails = async (req, res) => {
    console.log("API HITTING: getBookDetails")
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book details', error });
    }
};
