import Axios from 'axios';

const API_KEY = 'fab6cc42e439fde042bea7a12d72df6b';
const PATH = 'https://api.themoviedb.org/3/';

const getPopularMovies = () =>
  Axios.get(`${PATH}trending/movie/day?api_key=${API_KEY}`).then(
    ({ data }) => data.results,
  );

const getMovieByTitle = title =>
  Axios.get(`${PATH}search/movie?api_key=${API_KEY}&query=${title}`).then(
    ({ data }) => data.results,
  );

const getMovieById = id =>
  Axios.get(`${PATH}movie/${id}?api_key=${API_KEY}`).then(({ data }) => data);

const getCastDetails = id =>
  Axios.get(`${PATH}movie/${id}/credits?api_key=${API_KEY}`).then(
    ({ data }) => data.cast,
  );

const getReviewsDetails = id =>
  Axios.get(`${PATH}movie/${id}/reviews?api_key=${API_KEY}`).then(
    ({ data }) => data.results,
  );

const fetch = {
  getPopularMovies,
  getMovieByTitle,
  getMovieById,
  getCastDetails,
  getReviewsDetails,
};

export default fetch;
