async function loadMovies() {
  const movieList = document.getElementById("movie-list");

  try {
    const response = await fetch("/api/movies");

    if (!response.ok) {
      throw new Error("Failed to load movies");
    }

    const movies = await response.json();

    movieList.innerHTML = "";

    movies.forEach((movie) => {
      const movieCard = `
        <div class="col s12 m6 l4">
          <div class="card movie-card">
            <div class="card-content">
              <span class="card-title">
                ${movie.movieTitle}
              </span>

              <p><strong>Genre:</strong> ${movie.genre}</p>
              <p><strong>Director:</strong> ${movie.director}</p>
              <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
              <p><strong>Rating:</strong> ${movie.rating}/10</p>
            </div>

            <div class="card-action">
              <span class="rating-badge">
                <i class="material-icons tiny">star</i>
                ${movie.rating}
              </span>
            </div>
          </div>
        </div>
      `;

      movieList.insertAdjacentHTML("beforeend", movieCard);
    });
  } catch (error) {
    console.error("Error loading movies:", error);

    movieList.innerHTML = `
      <div class="col s12">
        <div class="card-panel red lighten-4">
          <p>Unable to load movie data.</p>
        </div>
      </div>
    `;
  }
}

async function addMovie(event) {
  event.preventDefault();

  const movieData = {
    movieTitle: document.getElementById("movie-title").value.trim(),
    genre: document.getElementById("genre").value.trim(),
    director: document.getElementById("director").value.trim(),
    releaseYear: Number(
      document.getElementById("release-year").value
    ),
    rating: Number(
      document.getElementById("rating").value
    )
  };

  try {
    const response = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to add movie");
    }

    M.toast({
      html: "Movie added successfully"
    });

    document.getElementById("movie-form").reset();

    M.updateTextFields();

    await loadMovies();

    document.getElementById("movies").scrollIntoView({
      behavior: "smooth"
    });
  } catch (error) {
    console.error("Error adding movie:", error);

    M.toast({
      html: error.message
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMovies();

  const movieForm = document.getElementById("movie-form");

  movieForm.addEventListener("submit", addMovie);
});