const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Movie", movieSchema);