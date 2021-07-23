import axios from 'axios';

const API__KEY = '16092738eabd8acc3b7b5db91d1d6d26';
axios.defaults.baseURL = 'https://api.themoviedb.org';

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`/3/trending/movie/day?api_key=${API__KEY}`);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSearchMovies = async searchquery => {
  try {
    const response = await axios.get(
      `/3/search/movie?api_key=${API__KEY}&query=${searchquery}&language=en-US`,
    );
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getDescriptionMovie = async movieId => {
  try {
    const response = await axios.get(`/3/movie/${movieId}?api_key=${API__KEY}`);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getGenresMovies = async () => {
  try {
    const response = await axios.get(`/3/genre/movie/list?api_key=${API__KEY}&language=en-US`);
    const genresArray = await response.data.genres;
    return genresArray;
  } catch (error) {
    console.log(error.message);
  }
};
