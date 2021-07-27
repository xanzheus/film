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

// ======================================================
requestServise.getTrendingMovies().then(data => {
  renderPaginationTrandingMovie(data.total_pages);
});

const searchQuery = 'Titanic';
requestServise.query = searchQuery;

requestServise.getSearchMovies().then(data => {
  renderPaginationSearchMovie(data.total_pages);
});
