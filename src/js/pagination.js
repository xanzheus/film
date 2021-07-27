import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import testTpl from '../templates/test.hbs';

import RequestService from './request.service';
const requestServise = new RequestService();

// ref
const container = document.getElementById('tui-pagination-container');
const cardsContainer = document.querySelector('.gallery');

export function renderPaginationTrandingMovie(totalItems) {
  const options = {
    totalItems,
    itemsPerPage: 1,
    visiblePages: 5,
  };
  const pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    requestServise.page = currentPage;
    console.log(currentPage);

    requestServise.getTrendingMovies().then(data => {
      const markup = data.results;
      console.log(markup);
      reset();
      appendMoviesMarkup(markup);
    });
  });
}

export function renderPaginationSearchMovie(totalItems) {
  const options = {
    totalItems,
    itemsPerPage: 1,
    visiblePages: 5,
  };
  const pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    requestServise.page = currentPage;

    console.log(requestServise.query);

    requestServise.getSearchMovies().then(data => {
      const markup = data.results;
      reset();
      appendMoviesMarkup(markup);
    });
  });
}

const appendMoviesMarkup = movies => {
  cardsContainer.insertAdjacentHTML('beforeend', testTpl(movies));
};

const reset = () => {
  cardsContainer.innerHTML = '';
};
