const createBookCard = (book) => {
    return `
        <div class="col s12 m6 l4">

            <div class="card medium book-card">

                <div class="card-image waves-effect waves-block waves-light">

                    <img class="activator"
                         src="${book.image}"
                         alt="${book.title} book cover">

                </div>

                <div class="card-content">

                    <span class="card-title activator grey-text text-darken-4">

                        ${book.title}

                        <i class="material-icons right">
                            more_vert
                        </i>

                    </span>

                    <p class="book-author">
                        <i class="material-icons tiny">
                            person
                        </i>

                        ${book.author}
                    </p>

                    <span class="book-category">
                        ${book.category}
                    </span>

                </div>

                <div class="card-reveal">

                    <span class="card-title grey-text text-darken-4">

                        ${book.title}

                        <i class="material-icons right">
                            close
                        </i>

                    </span>

                    <p>
                        ${book.description}
                    </p>

                </div>

            </div>

        </div>
    `;
};

const displayBooks = (books) => {
    const bookList = $("#book-list");

    bookList.empty();

    books.forEach((book) => {
        bookList.append(createBookCard(book));
    });
};

const displayError = () => {
    $("#book-list").html(`
        <div class="col s12 center-align">

            <div class="error-message">

                <i class="material-icons">
                    error_outline
                </i>

                <p>
                    Book data could not be loaded.
                    Please check that the Express server is running.
                </p>

            </div>

        </div>
    `);
};

const getBooks = () => {
    fetch("/api/books")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to load books");
            }

            return response.json();
        })
        .then((books) => {
            displayBooks(books);
        })
        .catch((error) => {
            console.error("Error loading books:", error);
            displayError();
        });
};

$(document).ready(function () {
    getBooks();
});