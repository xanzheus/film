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

    requestServise.getTrendingMovies().then(data => {
      const markup = data.results;
      console.log(markup);
      reset();
      appendImagesMarkup(markup);
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

    requestServise.getSearchMovies().then(data => {
      const markup = data.results;
      reset();
      appendImagesMarkup(markup);
    });
  });
}

const appendImagesMarkup = images => {
  cardsContainer.insertAdjacentHTML('beforeend', testTpl(images));
};

const reset = () => {
  cardsContainer.innerHTML = '';
};
