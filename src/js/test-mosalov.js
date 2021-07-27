import RequestService from './request.service';
// to get started, you need to create an instance of the class
const requestServise = new RequestService();

import { renderPaginationTrandingMovie, renderPaginationSearchMovie } from './pagination';

// searchQuery this is the value of the input
// const searchQuery = 'Titanic';

// searchQuery this is the value of the input
// requestServise.query = searchQuery;

// requestServise.getTrendingMovies().then(console.log);
// requestServise.getSearchMovies().then(console.log);
// function await "ID"
// requestServise.getDescriptionMovie(334455).then(console.log);
// requestServise.getGenresMovies().then(console.log);
// To get the full url of the picture. Runing the first part
// console.log(requestServise.getPrefixUrlImg('/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg'));

//! ==================== Examples ==================================
import testTpl from '../templates/mosalov-test.hbs';

import refs from './refs';

const appendMoviesMarkup = images => {
  refs.resultAnchor.insertAdjacentHTML('beforeend', testTpl(images));
};

const resetMarkup = () => {
  refs.resultAnchor.innerHTML = '';
};

// requestServise.getTrendingMovies().then(data => {
//   const totalPages = data.total_pages;
//   renderPaginationTrandingMovie(totalPages);
//   const markup = data.results;
//   resetMarkup();
//   appendMoviesMarkup(markup);
// });

//* =======================
const searchQuery = 'Titanic';
requestServise.query = searchQuery;

requestServise.getSearchMovies().then(data => {
  renderPaginationSearchMovie(searchQuery, data.total_pages);

  const markup = data.results;
  resetMarkup();
  appendMoviesMarkup(markup);
});
