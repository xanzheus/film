import refs from './refs';
import RequestService from './request.service';
import markupCarTrandingTpl from '../templates/cardFilmTrandingTpl.hbs';
import markupCardLibraryTpl from '../templates/cardFilmLibraryTpl.hbs';
import { getCardsMarkup } from './hover-responsive';
import { cardMoreLoad } from './cardLoadNextTpl.js';
import { getDataFromLocalStorage } from './local-storage';
import { renderPaginationTrandingMovie, renderPaginationSearchMovie } from './pagination';
import { addClassToElement, removeClassFromElement } from './actions-functions';
import { showLoader } from './loader';
import { clearSearchInput } from './clear-search-input';
import { trim } from 'jquery';
import { addErrorStartLoad, removeErrorStartLoad } from './error-load-page';
import { getMarkupForLoadeMoreBtn } from './loadMoreBtn';
// import {renderPaginationLibrary} from './pagination'
import toastr from 'toastr';
import tosrtOption from './toastr';

const requestService = new RequestService();
let genresList;
let currentPage;
let totalItems;

const setCurrentPage = number => {
  currentPage = number;
};

const setTotalItems = total => {
  totalItems = total;
};

const onErrorMessage = error => {
  toastr.error(error);
};

const addPaginationTranding = data => {
  if (data.total_pages > 1) {
    renderPaginationTrandingMovie(data.total_pages);
  }
  return data;
};

const addPaginationSearch = data => {
  const searchQuery = refs.searchInput.value;
  renderPaginationSearchMovie(searchQuery, data.total_pages);
  return data;
};

const addPaginationLibrary = array => {
  // if (array.length > 21) {
  //   renderPaginationLibrary(array);
  // }

  makeMarkupLibraryCardsList(array);
};

const setResults = response => {
  return response?.results;
};

const makeMarkupCardMoreLoad = () => {
  if ((!currentPage && totalItems > 1) || (totalItems !== 1 && currentPage < totalItems)) {
    refs.resultAnchor.insertAdjacentHTML('beforeend', cardMoreLoad());
    getMarkupForLoadeMoreBtn();
  }
};

const makeMarkupTrandingCardsList = array => {
  refs.resultAnchor.insertAdjacentHTML('beforeend', markupCarTrandingTpl(array));
  getCardsMarkup();
};

const makeMarkupLibraryCardsList = array => {
  refs.resultAnchor.insertAdjacentHTML('beforeend', markupCardLibraryTpl(array));
  getCardsMarkup();
};

const makeValidatesReleaseDate = data => {
  return data.slice(0, 4);
};

const makefilterObject = ({
  poster_path,
  genre_ids,
  id,
  original_title,
  release_date,
  vote_average,
}) => {
  const newObject = {};
  newObject.poster_path = poster_path;
  newObject.genre_ids = genre_ids;
  newObject.id = id;
  newObject.original_title = original_title;
  newObject.release_date = release_date;
  newObject.vote_average = vote_average.toFixed(1);
  return newObject;
};

const setfilterObjects = array => {
  const shortArray = array.map(makefilterObject);
  return shortArray;
};

const setGenresList = array => {
  genresList = [...array];
};

const makeValidatesGenreName = array => {
  array.forEach(object => {
    if (object.genre_ids) {
      object.genre_ids.forEach((idGenre, indexGenre) => {
        genresList.forEach(objectNames => {
          if (objectNames.id === idGenre) {
            object.genre_ids.splice(indexGenre, 1, objectNames['name']);
          }
        });
      });
    } else {
      object.genre_ids = '';
    }
  });

  return array;
};

const makeGenresList = () => {
  requestService.getGenresMovies().then(setGenresList);
};

const makePosterPatch = object => {
  return (object.poster_path = object.poster_path
    ? requestService.getPrefixUrlImg(object.poster_path)
    : // : // : "https://more-show.ru/upload/not-a/vailable.png"
      'https://live.staticflickr.com/65535/51349451747_f6d7898f2c_n.jpg');
};

const setValidatesPosterPath = array => {
  array.forEach(makePosterPatch);
  return array;
};
const makeShortReleaseDate = object => {
  object.release_date = object.release_date ? makeValidatesReleaseDate(object.release_date) : '';
};

const setValidatesReleaseDate = array => {
  array.forEach(makeShortReleaseDate);

  return array;
};

const clearCardsList = () => {
  refs.resultAnchor.innerHTML = '';
};

const renderingTrendingCardsList = () => {
  requestService
    .getTrendingMovies()
    .then(addPaginationTranding)
    .then(setResults)
    .then(setfilterObjects)
    .then(setValidatesPosterPath)
    .then(setValidatesReleaseDate)
    .then(makeValidatesGenreName)
    .then(makeMarkupTrandingCardsList)
    .then(makeMarkupCardMoreLoad)
    .then(addClassToElement(refs.loader, 'is-hidden'))
    // .then(changeCursor)
    .catch(onErrorMessage);
};

const renderingLibraryCardsList = () => {
  const arrayFilms = getDataFromLocalStorage();
  // const arrayForMarkup =  addPaginationLibrary(arrayForPagination)
  addClassToElement(refs.paginationAnchorRef, 'hidden');
  const arrayForMarkup = makeMarkupLibraryCardsList(arrayFilms);
  makeMarkupLibraryCardsList(arrayForMarkup);
  addClassToElement(refs.loader, 'is-hidden');
  // changeCursor();
};

const renderingLibrary = e => {
  clearCardsList();
  // console.log()
  const nameLibrary =
    e.target.getAttribute('id') === 'watch' || e.target.getAttribute('id') === 'queue'
      ? e.target.getAttribute('id')
      : '';

  console.log(e.target.getAttribute('id'));
  const arrayFilms = getDataFromLocalStorage(nameLibrary);
  // const arrayForMarkup =  addPaginationLibrary(arrayForPagination)
  addClassToElement(refs.paginationAnchorRef, 'hidden');
  const arrayForMarkup = makeMarkupLibraryCardsList(arrayFilms);
  makeMarkupLibraryCardsList(arrayForMarkup);
  addClassToElement(refs.loader, 'is-hidden');
};

const renderingSearchCardsList = () => {
  const searchQuery = trim(refs.searchInput.value);
  if (!searchQuery) {
    loadHomePage();
    toastr.warning('Empty request. Please enter what you want to find');
    return;
  }

  requestService.query = searchQuery;
  clearCardsList();
  requestService
    .getSearchMovies()
    .then(addPaginationSearch)
    .then(setResults)
    .then(setfilterObjects)
    .then(setValidatesPosterPath)
    .then(setValidatesReleaseDate)
    .then(makeValidatesGenreName)
    .then(makeMarkupLibraryCardsList)
    .then(makeMarkupCardMoreLoad)
    .then(clearSearchInput)
    .then(addClassToElement(refs.loader, 'is-hidden'))
    // .then(changeCursor)
    .catch(onErrorMessage);
};

const loadHomePage = () => {
  // console.log('start')
  makeGenresList();
  clearCardsList();
  removeClassFromElement(refs.loader, 'is-hidden');
  showLoader();
  removeErrorStartLoad();
  setTimeout(renderingTrendingCardsList, 400);
};

//=====================function for load page with SEARCHING RESULT============
const loadSearchPage = () => {
  removeClassFromElement(refs.loader, 'is-hidden');
  makeGenresList();
  clearCardsList();
  showLoader();
  removeErrorStartLoad();
  setTimeout(renderingSearchCardsList, 1000); ////////
};

//==================== function for load LIBRARY page =======================
const loadLibraryPage = () => {
  removeErrorStartLoad();
  //////////////////////////////////////
  removeClassFromElement(refs.loader, 'is-hidden');
  clearCardsList();
  showLoader();
  setTimeout(renderingLibraryCardsList, 400); ///////////////////////
};

// changeCursor();
loadHomePage();

export {
  setResults,
  setfilterObjects,
  setValidatesPosterPath,
  setValidatesReleaseDate,
  makeValidatesGenreName,
  makeMarkupTrandingCardsList,
  makeMarkupCardMoreLoad,
  clearCardsList,
  showLoader,
  renderingTrendingCardsList,
  renderingLibraryCardsList,
  renderingSearchCardsList,
  loadSearchPage,
  loadLibraryPage,
  onErrorMessage,
  setCurrentPage,
  setTotalItems,
  makeValidatesReleaseDate,
  makePosterPatch,
  makeMarkupLibraryCardsList,
  loadHomePage,
  renderingLibrary,
};
