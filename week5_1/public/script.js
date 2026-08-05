fetch("/api/books")
  .then((response) => response.json())
  .then((result) => {
    const books = result.data;

    const booksList = document.getElementById("books-list");

    booksList.innerHTML = "";

    books.forEach((book) => {
      const bookCard = document.createElement("div");

      bookCard.className = "book-card";

      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
      `;

      booksList.appendChild(bookCard);
    });
  })
  .catch((error) => {
    console.error(error);

    document.getElementById("books-list").innerHTML =
      "<p>Failed to load books.</p>";
  });