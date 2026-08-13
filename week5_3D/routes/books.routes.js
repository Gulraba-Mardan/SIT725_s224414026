const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books.controller");

// GET /api/books
router.get("/", booksController.getAllBooks);

// GET /api/books/:id
router.get("/:id", booksController.getBookById);

// POST /api/books
router.post("/", booksController.createBook);

// PUT /api/books/:id
router.put("/:id", booksController.updateBook);

module.exports = router;