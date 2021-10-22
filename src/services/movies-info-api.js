const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d29ba145518c5f0b2080fe6c1b6f87c8";

async function fetchHandler(url = "") {
  const response = await fetch(url);
  return response.ok ? response.json() : Promise.reject(new Error("Not found"));
}

const getTrending = () => {
  return fetchHandler(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
};

const getMovieById = (id) => {
  return fetchHandler(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US` //uk
  );
};

const getMovieByQuery = (query) => {
  return fetchHandler(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&&include_adult=false`
  );
};

const getMovieCast = (id) => {
  return fetchHandler(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
};

const getMovieReviews = (id) => {
  return fetchHandler(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
};

export {
  getTrending,
  getMovieById,
  getMovieByQuery,
  getMovieCast,
  getMovieReviews,
};
