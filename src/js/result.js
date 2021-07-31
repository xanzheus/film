import refs from './refs';
import RequestService from './request.service';
import markupCarTrandingTpl from '../templates/cardFilmTrandingTpl.hbs';
import markupCarLibraryTpl from '../templates/cardFilmLibraryTpl.hbs';
import { getCardsMarkup } from './hover-responsive';

import { cardMoreLoad } from './cardLoadNextTpl.js';
import { setLibraryToLocalStorage } from './local-storage';
import { renderPaginationTrandingMovie, renderPaginationSearchMovie } from './pagination';

const requestService = new RequestService();

const onErrorMessage = (error) => {
  console.log(error)
}

const addPaginationTranding = data => {
  if (data.total_pages > 1) {
    renderPaginationTrandingMovie(data.total_pages);
  }
  return data;
};

const addPaginationSearch = data => {
  if (data.total_pages > 1) {
    renderPaginationSearchMovie(requestServise.query, data.total_pages);
  }
  return data;
};

const setResults = response => {
  return response?.results;
};

const makeMarkupCardMoreLoad = () => {
  refs.resultAnchor.insertAdjacentHTML('beforeend', cardMoreLoad());
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

const makefilterObjects = array => {
  const shortArray = array.map(makefilterObject);
  return shortArray;
};

let genresList;

const setGenresList = array => {
  genresList = [...array];
  renderingTrendingCardsList();
};

const makeValidatesGenreName = array => {
  array.forEach(object => {
    if(object.genre_ids) {
      object.genre_ids.forEach((idGenre, indexGenre) => {
      genresList.forEach(objectNames => {
        if (objectNames.id === idGenre) {
          object.genre_ids.splice(indexGenre, 1, objectNames['name']);
        }
      });
    })} else {
      object.genre_ids = ''}
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
      : "https://more-show.ru/upload/not-available.png"
    });
    console.log(array)
    return array;
};

const setValidatesReleaseDate = array => {
  array.forEach(object => {
    object.release_date = object.release_date
    ? makeValidatesReleaseDate(object.release_date)
    : '';
  });

  return array;
};

const clearCardsList = () => {
  refs.resultAnchor.innerHTML = '';
};

const renderingTrendingCardsList = () => {
  clearCardsList();
  requestService
    .getTrendingMovies()
    .then(addPaginationTranding)
    .then(setResults)
    .then(makefilterObjects)
    .then(setValidatesPosterPath)
    .then(setValidatesReleaseDate)
    .then(makeValidatesGenreName)
    .then(makeMarkupTrandingCardsList)
    .then(makeMarkupCardMoreLoad)
    .catch(onErrorMessage)
};

const renderingLibraryCardsList = () => {
  clearCardsList();
  setLibraryToLocalStorage() //////функция от Леши, с тотал пейджс и массивом обьектов
    .then(addPaginationTranding)
    .then(makeMarkupLibraryCardsList);
};

const renderingSearchCardsList = searchQuery => {
  requestServise.query = searchQuery;
  clearCardsList();
  requestService
    .getSearchMovies()
    .then(addPaginationSearch)
    .then(setResults)
    .then(makefilterObjects)
    .then(setValidatesPosterPath)
    .then(setValidatesReleaseDate)
    .then(makeValidatesGenreName)
    .then(makeMarkupLibraryCardsList)
    .then(makeMarkupCardMoreLoad)
    .catch(onErrorMessage)
};

makeGenresList();

export {
  setResults,
  makefilterObjects,
  setValidatesPosterPath,
  setValidatesReleaseDate,
  makeValidatesGenreName,
  makeMarkupTrandingCardsList,
  makeMarkupCardMoreLoad,
  clearCardsList,
  renderingTrendingCardsList,
  renderingLibraryCardsList,
  renderingSearchCardsList,
};
