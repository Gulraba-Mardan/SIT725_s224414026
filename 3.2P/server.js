const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the public folder
app.use(express.static(__dirname + "/public"));

// Book data
const books = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "images/hobbit.jpg",
        category: "Fantasy",
        description:
            "A fantasy adventure about Bilbo Baggins, who joins a group of dwarves on a journey to reclaim their homeland."
    },
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        image: "images/harrypotter.jpg",
        category: "Fantasy",
        description:
            "A young wizard begins his magical journey at Hogwarts and discovers friendship, courage and a hidden past."
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        image: "images/alchemist.jpg",
        category: "Adventure",
        description:
            "A story about a young shepherd who follows his dreams and learns important lessons during his journey."
    }
];

// Simple GET REST endpoint
app.get("/api/books", (req, res) => {
    res.json(books);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});