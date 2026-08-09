const booksService = require("../services/books.service");

// Return all books
const getAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks();

    res.status(200).json({
      data: books
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
};

// Return one book by ID
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await booksService.getBookById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      data: book
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving book"
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById
};