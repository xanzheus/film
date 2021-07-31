import RequestService from './request.service';
const requestService = new RequestService();

// Library of values (watch or queue)
const localStorageLibrary = {
  watch: [],
  queue: [],
};

let buttonValue = 'queue';
let cardId;

// ** FUNCTION: GET DATA FROM LOCAL STORAGE  **//
const getDataFromLocalStorage = function (value) {
  return JSON.parse(localStorage.getItem(value));
};

/// ** FUNCTION: ADD DATA TO LOCAL STORAGE  **//
const addDataToLocalStorage = function (currentCardId = 617502) {
  // *for test  currentCardId = cardId;
  currentCardId = cardId;

  requestService
    .getDescriptionMovie(currentCardId)
    .then(createShortlibraryOfValues)
    .then(addDataToTheLibrary)
    .then(setLibraryToLocalStorage);
};

const createShortlibraryOfValues = function (film) {
  const libraryOfValues = {};
  libraryOfValues.id = film.id;
  libraryOfValues.original_title = film.original_title;
  libraryOfValues.release_date = film.release_date;
  libraryOfValues.vote_average = film.vote_average;
  return libraryOfValues;
};

const addDataToTheLibrary = function (film) {
  localStorageLibrary[buttonValue].push(film);

  const arr = localStorageLibrary[buttonValue];
  let uniqueArr = arr.reduce((unique, current) => {
    if (!unique.some(obj => obj.id === current.id)) {
      unique.push(current);
    }
    return unique;
  }, []);

  return uniqueArr;
};

const setLibraryToLocalStorage = function (library) {
  localStorage.setItem(buttonValue, JSON.stringify(library));
  return localStorage;
};

// ** просто ПРОВЕРКи **//
// addDataToLocalStorage();
// addDataToLocalStorage(379686);
// addDataToLocalStorage(379686);
// addDataToLocalStorage(379686);
// addDataToLocalStorage(520763);
// addDataToLocalStorage(520763);

// console.log(getDataFromLocalStorage('watch'));
// console.log(getDataFromLocalStorage('queue'));

export {addDataToTheLibrary, setLibraryToLocalStorage}