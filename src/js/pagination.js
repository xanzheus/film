import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import RequestService from './request.service';
const requestServise = new RequestService();

import {
  clearCardsList,
  setResults,
  makefilterObjects,
  setValidatesPosterPath,
  setValidatesReleaseDate,
  makeValidatesGenreName,
  makeMarkupTrandingCardsList,
  makeMarkupCardMoreLoad,
} from './result';

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

    clearCardsList();

    requestServise
      .getTrendingMovies()
      .then(setResults)
      .then(makefilterObjects)
      .then(setValidatesPosterPath)
      .then(setValidatesReleaseDate)
      .then(makeValidatesGenreName)
      .then(makeMarkupTrandingCardsList)
      .then(makeMarkupCardMoreLoad);
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

    clearCardsList();

    requestServise
      .getSearchMovies()
      .then(setResults)
      .then(makefilterObjects)
      .then(setValidatesPosterPath)
      .then(setValidatesReleaseDate)
      .then(makeValidatesGenreName)
      .then(makeMarkupTrandingCardsList)
      .then(makeMarkupCardMoreLoad);
  });
}
