const booksService = require("../services/books.service");

// Return all books
const getAllBooks = (req, res) => {
  const books = booksService.getAllBooks();

  res.status(200).json({
    data: books
  });
};

// Return one book by ID
const getBookById = (req, res) => {
  const bookId = req.params.id;
  const book = booksService.getBookById(bookId);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.status(200).json({
    data: book
  });
};

module.exports = {
  getAllBooks,
  getBookById
};