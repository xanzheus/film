import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { addClassToElement, removeClassFromElement } from './actions-functions';
import RequestService from './request.service';
import { addErrorStartLoad, removeErrorStartLoad } from './error-load-page';
import toastr from 'toastr';
import tosrtOption from './toastr';

const requestService = new RequestService();

import {
  clearCardsList,
  setResults,
  setfilterObjects,
  setValidatesPosterPath,
  setValidatesReleaseDate,
  makeValidatesGenreName,
  makeMarkupTrandingCardsList,
  makeMarkupCardMoreLoad,
  showLoader,
  onErrorMessage,
  setCurrentPage,
  setTotalItems,
  makeMarkupLibraryCardsList,
} from './result';

// refs correct
import refs from './refs';

export function renderPaginationTrandingMovie(totalItems) {
  if (totalItems === 0) {
    addErrorStartLoad();
  }
  if (totalItems <= 1) {
    addClassToElement(refs.paginationAnchorRef, 'hidden');
  } else {
    removeClassFromElement(refs.paginationAnchorRef, 'hidden');
    setTotalItems(totalItems);
  }

  const options = {
    totalItems,
    itemsPerPage: 1,
    visiblePages: 5,
  };
  const pagination = new Pagination(refs.paginationAnchorRef, options);

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    setCurrentPage(currentPage);
    requestService.page = currentPage;

    showLoader();
    removeClassFromElement(refs.loader, 'is-hidden');
    clearCardsList();

    const renderingPage = () => {
      requestService
        .getTrendingMovies()
        .then(setResults)
        .then(setfilterObjects)
        .then(setValidatesPosterPath)
        .then(setValidatesReleaseDate)
        .then(makeValidatesGenreName)
        .then(makeMarkupTrandingCardsList)
        .then(makeMarkupCardMoreLoad)
        .then(addClassToElement(refs.loader, 'is-hidden'))
        .catch(onErrorMessage);
    };

    setTimeout(renderingPage, 400);
  });
}

export function renderPaginationSearchMovie(query, totalItems) {
  setTotalItems(totalItems);
  if (totalItems === 0) {
    addErrorStartLoad();
    addClassToElement(refs.paginationAnchorRef, 'hidden');
  } else {
    if (totalItems === 1) {
      addClassToElement(refs.paginationAnchorRef, 'hidden');
    } else {
      removeClassFromElement(refs.paginationAnchorRef, 'hidden');
    }
  }

  if (query === '') {
    let warningStr = lang === 'en' 
        ? 'Error: Empty searchQuery'
        : 'Ошибка! Пустой запрос. Введите что-нибудь.';
    toastr.error(warningStr);
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
    setCurrentPage(currentPage);
    requestService.page = currentPage;
    requestService.query = pagination.query;
    clearCardsList();
    removeClassFromElement(refs.loader, 'is-hidden');
    showLoader();
    const renderingPage = () => {
      requestService
        .getSearchMovies()
        .then(setResults)
        .then(setfilterObjects)
        .then(setValidatesPosterPath)
        .then(setValidatesReleaseDate)
        .then(makeValidatesGenreName)
        .then(makeMarkupTrandingCardsList)
        .then(makeMarkupCardMoreLoad)
        .then(addClassToElement(refs.loader, 'is-hidden'))
        .catch(onErrorMessage);
    };
    setTimeout(renderingPage, 400);
  });
}
