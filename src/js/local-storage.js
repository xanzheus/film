import RequestService from './request.service';
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
const getDataFromLocalStorage = function (value) {
  return JSON.parse(localStorage.getItem(value));
};

/// ** FUNCTION: ADD DATA TO LOCAL STORAGE  **//
const addDataToLocalStorage = function (currentCardId) {
  requestService
    .getDescriptionMovie(currentCardId)
    .then(createShortlibraryOfValues)
    .then(addDataToTheLibrary)
    .then(setLibraryToLocalStorage);
};

const createShortlibraryOfValues = function (film) {
  // console.log(film);
  const libraryOfValues = {};
  libraryOfValues.id = film.id;
  libraryOfValues.original_title = film.original_title;
  libraryOfValues.genres = film.genres;
  libraryOfValues.release_date = film.release_date;
  libraryOfValues.vote_average = film.vote_average;
  libraryOfValues.poster_path = film.poster_path;
  libraryOfValues.backdrop_path = film.backdrop_path;
  return libraryOfValues;
};

const addDataToTheLibrary = function (film) {
  // console.log(film);
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
  // localStorage.removeItem(val);
  localStorage.setItem(val, JSON.stringify(newAr));
};

export { addDataToLocalStorage, getDataFromLocalStorage, removeFromLibrary, getBtnValue };
