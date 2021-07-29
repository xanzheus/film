import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import testTpl from '../templates/mosalov-test.hbs'; // need change to correct

import RequestService from './request.service';
const requestServise = new RequestService();

// refs correct
import refs from './refs';

export function renderPaginationTrandingMovie(totalItems) {
  const options = {
    totalItems,
    itemsPerPage: 1,
    visiblePages: 5,
  };
  const pagination = new Pagination(refs.paginationAnchorRef, options);

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    requestServise.page = currentPage;

    requestServise.getTrendingMovies().then(data => {
      const markup = data.results;
      resetMarkup();
      appendMoviesMarkup(markup);
    });
  });
}

export function renderPaginationSearchMovie(query, totalItems) {
  if (query === '') {
    console.log('Error: Empty searchQuery');
    return;
  }

  const options = {
    totalItems,
    itemsPerPage: 1,
    visiblePages: 5,
  };
  const pagination = new Pagination(refs.paginationAnchorRef, options);
  pagination.query = query;

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    requestServise.page = currentPage;

    requestServise.query = pagination.query;

    requestServise.getSearchMovies().then(data => {
      const markup = data.results;
      resetMarkup();
      appendMoviesMarkup(markup);
    });
  });
}

const appendMoviesMarkup = movies => {
  refs.resultAnchor.insertAdjacentHTML('beforeend', testTpl(movies));
};

const resetMarkup = () => {
  refs.resultAnchor.innerHTML = '';
};
