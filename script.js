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

  $("#actors-slider").slick({
    dots: true,
    infinite: false,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 5,
    
    
  });
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const movieUrl = constructUrl(`movie/${movieId}`);
  const creditsUrl = constructUrl(`movie/${movieId}/credits`);
  const [movieRes, creditsRes] = await Promise.all([
    fetch(movieUrl),
    fetch(creditsUrl),
  ]);
  const movie = await movieRes.json();
  const credits = await creditsRes.json();
  return { ...movie, credits };
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  const movieContainer = document.createElement("div");
  movieContainer.classList.add(
    "row",
    "row-cols-1",
    "row-cols-sm-1",
    "row-cols-md-3"
  );

  movies.map((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("col", "mb-4");

    movieCard.innerHTML = `
      <div class="card mt-5">
        <img class="card-img-top" src="${
          BACKDROP_BASE_URL + movie.backdrop_path
        }" alt="${movie.title} poster">
        <div class="card-body">
          <h5 class="card-title text-left text-muted">${movie.title}</h5>
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
    <div class="row my-5">
      <div class="col-md-4  ">
        <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
      </div>
      <div class="col-md-8 mt-10">
        <h2 id="movie-title">${movie.title}</h2>
        <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
        <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
        <h3>Overview:</h3>
        <p id="movie-overview">${movie.overview}</p>
      </div>
      <h3 class='mt-3'>Actors:</h3>
      <div id="actors-slider" class=''>
        ${movie.credits.cast
          .map(
            (actor) => `
              <div class='card mx-3 my-5'>
                <img class="card-img-top w-10" src="${PROFILE_BASE_URL + actor.profile_path}" alt="${
              actor.name
            }" onerror="this.parentElement.style.display='none';" > 
                <div class='card-body'>
                  <h6 class='card-title text-truncate small text-center'>${actor.name}</h6>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;
};


document.addEventListener("DOMContentLoaded", autorun);
