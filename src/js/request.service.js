import axios from 'axios';
import toastr from 'toastr';
import tosrtOption from './toastr';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
export const API__KEY = 'api_key=16092738eabd8acc3b7b5db91d1d6d26';

// You can find examples of how functions work in the file "test-mosalov.js"
export default class RequestService {
  constructor() {
    this.IMG__URL = 'https://image.tmdb.org/t/p/w500';
    this.trendingMovies = 'trending/movie/day';
    this.searchMovies = 'search/movie';
    this.movieById = 'movie';
    this.geners = 'genre/movie/list';
    this.searchQuery = '';
    this.page = 1;
    this.language = 'en';
  }
  // This function await callback to output an error in hendler
  async getTrendingMovies() {
    const url = `${this.trendingMovies}?${API__KEY}&page=${this.page}&language=${this.language}`;
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch {
      toastr.info('Sorry: server trending error please try again later');
    }
  }
  // This function await callback to output an error in hendler
  async getSearchMovies() {
    const searchParams = new URLSearchParams({
      query: this.searchQuery,
      language: this.language,
    });
    const url = `${this.searchMovies}?${API__KEY}&${searchParams}&page=${this.page}`;
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch {
      toastr.info('Sorry: server searc error please try again later');
    }
  }
  // This function await callback to output an error in hendler
  async getDescriptionMovie(movieId) {
    const url = `${this.movieById}/${movieId}?${API__KEY}`;
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch {
      toastr.error('Sorry: server error please try again later');
    }
  }

  async getGenresMovies() {
    const url = `${this.geners}?${API__KEY}`;
    try {
      const response = await axios.get(url);
      const genresArray = await response.data.genres;
      return genresArray;
    } catch {
      toastr.error('Sorry: server error please try again later');
    }
  }

  getPrefixUrlImg(url) {
    return `${this.IMG__URL}${url}`;
  }

  page(currentPage) {
    this.page = currentPage;
  }

  get query() {
    this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
