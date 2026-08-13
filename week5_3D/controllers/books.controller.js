const booksService = require("../services/books.service");

// Allowed fields for CREATE
const allowedCreateFields = [
  "id",
  "title",
  "author",
  "year",
  "genre",
  "summary",
  "price"
];

// Allowed fields for UPDATE
const allowedUpdateFields = [
  "title",
  "author",
  "year",
  "genre",
  "summary",
  "price"
];

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

// Create a new book
const createBook = async (req, res) => {
  try {

    // Check for unknown fields
    const receivedFields = Object.keys(req.body);

    const unknownFields = receivedFields.filter(
      field => !allowedCreateFields.includes(field)
    );

    if (unknownFields.length > 0) {
      return res.status(400).json({
        message: `Unknown field(s): ${unknownFields.join(", ")}`
      });
    }

    const newBook = await booksService.createBook(req.body);

    return res.status(201).json(newBook);

  } catch (error) {

    // Duplicate ID
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Book ID already exists"
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        err => err.message
      );

      return res.status(400).json({
        message: "Validation failed",
        errors: messages
      });
    }

    return res.status(400).json({
      message: error.message
    });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {

    // ID cannot be changed
    if (Object.prototype.hasOwnProperty.call(req.body, "id")) {
      return res.status(400).json({
        message: "Book ID is immutable and cannot be changed"
      });
    }

    // Check for unknown fields
    const receivedFields = Object.keys(req.body);

    const unknownFields = receivedFields.filter(
      field => !allowedUpdateFields.includes(field)
    );

    if (unknownFields.length > 0) {
      return res.status(400).json({
        message: `Unknown field(s): ${unknownFields.join(", ")}`
      });
    }

    const updatedBook = await booksService.updateBook(
      req.params.id,
      req.body
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    return res.status(200).json(updatedBook);

  } catch (error) {

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        err => err.message
      );

      return res.status(400).json({
        message: "Validation failed",
        errors: messages
      });
    }

    return res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
};