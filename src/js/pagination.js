import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { addClassToElement, removeClassFromElement } from './actions-functions';
import { getDataFromLocalStorage } from './local-storage';
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

// export function renderPaginationLibrary(array) {
//   if(array.length === 0) {
//     addErrorStartLoad()
//     addClassToElement(refs.paginationAnchorRef,'hidden');
//   }
//     if (array.length === 1) {
//       addClassToElement(refs.paginationAnchorRef,'hidden');
//     } else {
//       removeClassFromElement(refs.paginationAnchorRef, 'hidden');
//       setTotalItems(array.length)
//     }

//     console.log('89898')
//     const options = {///////////////////////////
//       totalItems: array.length,//////////////////////////
//       itemsPerPage: 21,//////////////////////////////
//       visiblePages: 5,
//       page: 1//////////////////////////////
//     };////////////////////////////////////////
//     const pagination = new Pagination(refs.paginationAnchorRef, options);

//     const renderListLibrary = (e) => {
//         const currentPage = e.page;
//         setCurrentPage(currentPage)
//         clearCardsList();
//         // console.log('1')
//         removeClassFromElement(refs.loader, 'is-hidden');
//         showLoader()
//         // const arrayForPagination = ;
//         const renderingPage = () => {
//           // console.log('2')
//         makeMarkupLibraryCardsList(getDataFromLocalStorage().slice(20, 25))
//         addClassToElement(refs.loader, 'is-hidden')
//         makeMarkupCardMoreLoad
//         addClassToElement(refs.loader, 'is-hidden')
//         console.log('rtrtrt')
//       }
//       setTimeout(renderingPage, 400);
//   }

//   pagination.on('afterMove', renderListLibrary);
// }

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
    toastr.error('Error: Empty searchQuery');
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
