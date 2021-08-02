import refs from './refs';
import RequestService from './request.service';
import markupCarTrandingTpl from '../templates/cardFilmTrandingTpl.hbs';
import markupCarLibraryTpl from '../templates/cardFilmLibraryTpl.hbs';
import { getCardsMarkup } from './hover-responsive';
import { cardMoreLoad } from './cardLoadNextTpl.js';
import { setLibraryToLocalStorage } from './local-storage';
import { renderPaginationTrandingMovie, renderPaginationSearchMovie } from './pagination';
import { addClassToElement, removeClassFromElement } from './actions-functions';
import { showLoader } from './_loader';
import { changeCursor } from './_magicMouse';
import { clearSearchInput } from './clear-search-input';
import { trim } from 'jquery';

const requestService = new RequestService();
let genresList;
let currentPage;
let totalItems;

const setCurrentPage = (number) => {
  currentPage= number
}

const setTotalItems = (total) => {
  totalItems = total
}

const onErrorMessage = error => {
  console.log(error);
};

const addPaginationTranding = data => {
  // totalPage = data.total_pages;

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


const setResults = response => {
  return response?.results;
};

const makeMarkupCardMoreLoad = () => {
  // console.log(totalItems)
  // console.log(currentPage)
  if(!currentPage && totalItems !== 1 || totalItems !== 1 && currentPage < totalItems) {
  refs.resultAnchor.insertAdjacentHTML('beforeend', cardMoreLoad());}
};

const makeMarkupTrandingCardsList = array => {
  refs.resultAnchor.insertAdjacentHTML('beforeend', markupCarTrandingTpl(array));
  getCardsMarkup();
};

const makeMarkupLibraryCardsList = array => {
  refs.resultAnchor.insertAdjacentHTML('beforeend', markupCarLibraryTpl(array));
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

const setValidatesPosterPath = array => {
  array.forEach(object => {
    object.poster_path = object.poster_path
      ? requestService.getPrefixUrlImg(object.poster_path)
      : // : "https://more-show.ru/upload/not-a/vailable.png"
        'https://live.staticflickr.com/65535/51349451747_f6d7898f2c_n.jpg';
  });
  // console.log(array)
  return array;
};

const setValidatesReleaseDate = array => {
  array.forEach(object => {
    object.release_date = object.release_date ? makeValidatesReleaseDate(object.release_date) : '';
  });

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
    .catch(onErrorMessage);
};

const renderingLibraryCardsList = () => {
  clearCardsList();
  setLibraryToLocalStorage() //////функция от Леши, с тотал пейджс и массивом обьектов
    .then(addPaginationTranding)
    .then(makeMarkupLibraryCardsList);
};

const renderingSearchCardsList = () => {
  const searchQuery = trim(refs.searchInput.value);
  console.log(searchQuery)
  if (!searchQuery) {
    loadHomePage();
    console.log('Empty request. Please enter what you want to find');
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
    .catch(onErrorMessage);
};

const loadHomePage = () => {
  makeGenresList();
  clearCardsList();
  removeClassFromElement(refs.loader, 'is-hidden');
  showLoader();
  setTimeout(renderingTrendingCardsList, 400);
};

//=====================function for load page with SEARCHING RESULT============
const loadSearchPage = () => {
  removeClassFromElement(refs.loader, 'is-hidden');
  makeGenresList();
  clearCardsList();
  showLoader();
  setTimeout(renderingSearchCardsList, 1000);////////
}

//==================== function for load LIBRARY page =======================
const loadLibraryPage = () => {//////////////////////////////////////
  removeClassFromElement(refs.loader, 'is-hidden');
  clearCardsList();
  showLoader();
  setTimeout(renderingTrendingCardsList, 400);///////////////////////
};

changeCursor();
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
  setTotalItems
};
