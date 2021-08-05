import RequestService from './request.service';
import { makeValidatesReleaseDate, makePosterPatch } from './result';
const requestService = new RequestService();

// Library of values (watch or queue)
const localStorageLibrary = {
  watch: [],
  queue: [],
};

let btnValue;

const getBtnValue = value => {
  btnValue = value;
};

// ** FUNCTION: GET DATA FROM LOCAL STORAGE  **//

const getDataFromLocalStorage = function (nameLibrary = 'watch') {
  return JSON.parse(localStorage.getItem(nameLibrary));
};

/// ** FUNCTION: ADD DATA TO LOCAL STORAGE  **//
const addDataToLocalStorage = function (currentCardId) {
  requestService
    .getDescriptionMovie(currentCardId)
    .then(createShortlibraryOfValues)
    .then(addDataToTheLibrary)
    .then(setLibraryToLocalStorage);
};

const listGenres = array => {
  return array.map(obj => obj.name);
};

const createShortlibraryOfValues = function (film) {
  const libraryOfValues = {};
  libraryOfValues.title = film.title;
  libraryOfValues.id = film.id;
  libraryOfValues.original_title = film.original_title;
  libraryOfValues.genres = listGenres(film.genres);
  libraryOfValues.release_date = makeValidatesReleaseDate(film.release_date);
  libraryOfValues.vote_average = film.vote_average.toFixed(1);
  libraryOfValues.poster_path = makePosterPatch(film);
  libraryOfValues.backdrop_path = film.backdrop_path;
  return libraryOfValues;
};

const addDataToTheLibrary = function (film) {
  const existDataFromLocalStorage = getDataFromLocalStorage(btnValue);

  if (existDataFromLocalStorage !== null) {
    localStorageLibrary[btnValue] = [...existDataFromLocalStorage];
  }

  localStorageLibrary[btnValue].push(film);
  const arr = localStorageLibrary[btnValue];
  let uniqueArr = arr.reduce((unique, current) => {
    if (!unique.some(obj => obj.id === current.id)) {
      unique.push(current);
    }
    return unique;
  }, []);

  return uniqueArr;
};

const setLibraryToLocalStorage = function (film) {
  localStorage.setItem(btnValue, JSON.stringify(film));
  return localStorage;
};

// **Remove film from localStorage for button(remove from...)
const removeFromLibrary = function (val, curId) {
  const libraryFromLocalStorage = JSON.parse(localStorage.getItem(val));
  const newAr = libraryFromLocalStorage.filter(n => {
    return n.id !== Number(curId);
  });
  localStorage.setItem(val, JSON.stringify(newAr));
};

export { addDataToLocalStorage, getDataFromLocalStorage, removeFromLibrary, getBtnValue };
