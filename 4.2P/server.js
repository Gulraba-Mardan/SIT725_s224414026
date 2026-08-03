const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Movie = require("./models/Movie");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/movieExplorerDB")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Get all movies from MongoDB
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    console.error("Error loading movies:", error);

    res.status(500).json({
      message: "Unable to load movies"
    });
  }
});

// Add a new movie to MongoDB
app.post("/api/movies", async (req, res) => {
  try {
    const {
      movieTitle,
      genre,
      director,
      releaseYear,
      rating
    } = req.body;

    if (
      !movieTitle ||
      !genre ||
      !director ||
      !releaseYear ||
      rating === undefined
    ) {
      return res.status(400).json({
        message: "All movie fields are required"
      });
    }

    const newMovie = new Movie({
      movieTitle,
      genre,
      director,
      releaseYear: Number(releaseYear),
      rating: Number(rating)
    });

    const savedMovie = await newMovie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    console.error("Error adding movie:", error);

    res.status(500).json({
      message: "Unable to add movie"
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});