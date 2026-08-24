const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Calculation function
function add(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return null;
  }

  return numA + numB;
}

// REST API
app.get("/add", (req, res) => {
  const { num_a, num_b } = req.query;

  const result = add(num_a, num_b);

  if (result === null) {
    return res.status(400).send("Invalid input");
  }

  res.status(200).send(`The sum is: ${result}`);
});

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Only start server when this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = { app, add };