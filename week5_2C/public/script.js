const getBooksButton = document.getElementById("get-books-btn");
const booksList = document.getElementById("books-list");
const bookDetails = document.getElementById("book-details");

getBooksButton.addEventListener("click", () => {
  fetch("/api/books")
    .then((response) => response.json())
    .then((result) => {
      const books = result.data;

      booksList.innerHTML = "";
      bookDetails.innerHTML = "";

      books.forEach((book) => {
        const bookItem = document.createElement("div");

        bookItem.className = "book-item";

        bookItem.innerHTML = `
          <p>
            <strong>${book.title}</strong>
            ${book.price.$numberDecimal} AUD
          </p>
        `;

        bookItem.addEventListener("click", () => {
          getBookDetails(book.id);
        });

        booksList.appendChild(bookItem);
      });
    })
    .catch((error) => {
      console.error(error);
      booksList.innerHTML = "<p>Failed to load books.</p>";
    });
});

function getBookDetails(id) {
  fetch(`/api/books/${id}`)
    .then((response) => response.json())
    .then((result) => {
      const book = result.data;

      bookDetails.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Summary:</strong> ${book.summary}</p>
        <p><strong>Price:</strong> ${book.price.$numberDecimal} AUD</p>
      `;
    })
    .catch((error) => {
      console.error(error);
      bookDetails.innerHTML = "<p>Failed to load book details.</p>";
    });
}