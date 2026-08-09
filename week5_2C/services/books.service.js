const Book = require("../models/Book");

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
  return await Book.findOne({ id: id });
};

module.exports = {
  getAllBooks,
  getBookById
};