const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongoURI = "mongodb://127.0.0.1:27017/booksDB";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Parse JSON request bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const bookRoutes = require("./routes/books.routes");
app.use("/api/books", bookRoutes);

// Integrity check
app.get("/api/integrity-check42", (req, res) => {
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});