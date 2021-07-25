import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API__KEY = 'api_key=16092738eabd8acc3b7b5db91d1d6d26';

// You can find examples of how functions work in the file "test-mosalov.js"
export default class RequestService {
  constructor() {
    this.IMG__URL = 'https://image.tmdb.org/t/p/w500';
    this.trendingMovies = 'trending/movie/day';
    this.searchMovies = 'search/movie';
    this.movieById = 'movie';
    this.geners = 'genre/movie/list';
    this.searchQuery = '';
  }
// This function await callback to output an error in hendler
  async getTrendingMovies(callback) {
    const url = `${this.trendingMovies}?${API__KEY}`;
    try {
      const response = await axios.get(url);
      return response?.data?.results;
    } catch (error) {
      console.log(error.message);
      callback();
    }
  }
// This function await callback to output an error in hendler
  async getSearchMovies(callback) {
    const searchParams = new URLSearchParams({
      query: this.searchQuery,
      language: 'en-US',
    });
    const url = `${this.searchMovies}?${API__KEY}&${searchParams}`;
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch (error) {
      console.log(error.message);
      callback();
    }
  }
// This function await callback to output an error in hendler
  async getDescriptionMovie(movieId, callback) {
    const url = `${this.movieById}/${movieId}?${API__KEY}`;
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch (error) {
      console.log(error.message);
      callback();
    }
  }

  async getGenresMovies() {
    const url = `${this.geners}?${API__KEY}`;
    try {
      const response = await axios.get(url);
      const genresArray = await response.data.genres;
      return genresArray;
    } catch (error) {
      console.log(error.message);
    }
  }

  getPrefixUrlImg(url) {
    return this.IMG__URL + url;
  }

  get query() {
    this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
