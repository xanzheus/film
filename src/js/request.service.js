import axios from 'axios';
import toastr from 'toastr';
import tosrtOption from './toastr';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
export const API__KEY = '7d26037feeaf4d437e8145fcf75aadec';

// You can find examples of how functions work in the file "test-mosalov.js"
export default class RequestService {
  language = localStorage.getItem('language');
  constructor() {
    this.IMG__URL = 'https://image.tmdb.org/t/p/w500';
    this.trendingMovies = 'trending/movie/day';
    this.searchMovies = 'search/movie';
    this.movieById = 'movie';
    this.geners = 'genre/movie/list';
    this.searchQuery = '';
    this.page = 1;
    this.language;
  }
  // This function await callback to output an error in hendler
  async getTrendingMovies() {
    const url = `${this.trendingMovies}?api_key=${API__KEY}&page=${this.page}&language=${this.language}`;
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch {
      let warningStr =
        lang === 'en'
          ? 'Sorry: server trending error, please try again later'
          : 'Извините, ошибка сервера. Пожалуйста, повторите запрос позже.';
      toastr.info(warningStr);
    }
  }
  // This function await callback to output an error in hendler
  async getSearchMovies() {
    const searchParams = new URLSearchParams({
      query: this.searchQuery,
      language: this.language,
    });
    const url = `${this.searchMovies}?api_key=${API__KEY}&${searchParams}&page=${this.page}`;
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch {
      let warningStr =
        lang === 'en'
          ? 'Sorry: server search error, please try again later'
          : 'Извините, ошибка поиска на сервере. Пожалуйста, повторите запрос позже.';
      toastr.info(warningStr);
    }
  }
  // This function await callback to output an error in hendler
  async getDescriptionMovie(movieId) {
    const url = `${this.movieById}/${movieId}?api_key=${API__KEY}&language=${this.language}`;
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch {
      let warningStr =
        lang === 'en'
          ? 'Sorry: server error, please try again later'
          : 'Извините, ошибка на сервере. Пожалуйста, повторите запрос позже.';
      toastr.error(warningStr);
    }
  }

  async getGenresMovies() {
    const url = `${this.geners}?api_key=${API__KEY}`;
    try {
      const response = await axios.get(url);
      const genresArray = await response.data.genres;
      return genresArray;
    } catch {
      let warningStr =
        lang === 'en'
          ? 'Sorry: server error, please try again later'
          : 'Извините, ошибка на сервере. Пожалуйста, повторите запрос позже.';
      toastr.error(warningStr);
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
