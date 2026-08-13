const mongoose = require("mongoose");

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Book ID is required"],
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },

  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: 2,
    maxlength: 100
  },

  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
    minlength: 2,
    maxlength: 60
  },

  year: {
    type: Number,
    required: [true, "Year is required"],
    min: 1000,
    max: currentYear
  },

  genre: {
    type: String,
    required: [true, "Genre is required"],
    trim: true,
    minlength: 3,
    maxlength: 30
  },

  summary: {
    type: String,
    required: [true, "Summary is required"],
    trim: true,
    minlength: 20,
    maxlength: 1000
  },

  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, "Price is required"],
    validate: {
      validator: function (value) {
        return parseFloat(value.toString()) > 0;
      },
      message: "Price must be greater than 0."
    }
  }
});

module.exports = mongoose.model("Book", bookSchema);