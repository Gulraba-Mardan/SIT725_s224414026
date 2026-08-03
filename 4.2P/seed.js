const mongoose = require("mongoose");
const Movie = require("./models/Movie");

const movies = [
  {
    movieTitle: "Inception",
    genre: "Science Fiction",
    director: "Christopher Nolan",
    releaseYear: 2010,
    rating: 8.8
  },
  {
    movieTitle: "Interstellar",
    genre: "Science Fiction",
    director: "Christopher Nolan",
    releaseYear: 2014,
    rating: 8.7
  },
  {
    movieTitle: "Spider-Man: Into the Spider-Verse",
    genre: "Animation",
    director: "Bob Persichetti",
    releaseYear: 2018,
    rating: 8.4
  },
  {
    movieTitle: "The Dark Knight",
    genre: "Action",
    director: "Christopher Nolan",
    releaseYear: 2008,
    rating: 9.0
  },
  {
    movieTitle: "Coco",
    genre: "Animation",
    director: "Lee Unkrich",
    releaseYear: 2017,
    rating: 8.4
  },
  {
    movieTitle: "Dune",
    genre: "Science Fiction",
    director: "Denis Villeneuve",
    releaseYear: 2021,
    rating: 8.0
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/movieExplorerDB"
    );

    console.log("MongoDB connected successfully");

    await Movie.deleteMany({});
    await Movie.insertMany(movies);

    console.log("Movie data added successfully");
  } catch (error) {
    console.error("Error adding movie data:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();