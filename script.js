"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("row", "row-cols-1", "row-cols-sm-1", "row-cols-md-3");

  movies.map((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("col", "mb-4");

    movieCard.innerHTML = `
      <div class="card mt-5">
        <img class="card-img-top" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster">
        <div class="card-body">
          <h5 class="card-title text-center">${movie.title}</h5>
        </div>
      </div>
    `;

    movieCard.addEventListener("click", () => {
      movieDetails(movie);
    });

    movieContainer.appendChild(movieCard);
  });

  CONTAINER.appendChild(movieContainer);
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="">
        <div class="">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

document.addEventListener("DOMContentLoaded", autorun);
