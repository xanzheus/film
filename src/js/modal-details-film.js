import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import refs from './refs';
import requestService from './request.service';
import { makeMarkup } from './modal-details-film-tpl';
import { ShowTrailer } from './trailer_to_film';
import { refreshLibrary } from './result';
import { savedThemeOnReloadedModalCard } from './isChangeTheme';

import { addClassToElement, removeClassFromElement } from './actions-functions';
import {
  addDataToLocalStorage,
  removeFromLibrary,
  getDataFromLocalStorage,
  getBtnValue,
} from './local-storage';

let target = '';

const getMoreDetailfilm = function ({
  id,
  title,
  poster_path,
  vote_average,
  vote_count,
  popularity,
  original_title,
  overview,
  genres,
}) {
  const descriptionFilm = {};
  descriptionFilm.id = id;
  descriptionFilm.title = title;
  descriptionFilm.poster_path = poster_path;
  descriptionFilm.vote_average = vote_average.toFixed(1);
  descriptionFilm.vote_count = vote_count.toFixed(1);
  descriptionFilm.popularity = popularity.toFixed(1);
  descriptionFilm.original_title = original_title;
  descriptionFilm.overview = overview;
  descriptionFilm.genres = genres
    .reduce((acc, genre) => {
      return `${acc}${genre.name}, `;
    }, '')
    .slice(0, -2);
  return descriptionFilm;
};

const showTrailer = new ShowTrailer();
const request = new requestService();

// IMAGE PATH

const setValidatesBackdrop_path = obj => {
  obj.poster_path = request.getPrefixUrlImg(obj.poster_path);
  return obj;
};

// API
const getActiveInfo = function (id) {
  return request
    .getDescriptionMovie(id)
    .then(getMoreDetailfilm)
    .then(setValidatesBackdrop_path)
    .then(makeMarkup)
    .then(doActionsShowModal);
};

// SHOW MODAL

const doActionsShowModal = function (markup) {
  showModal(markup);
  refs.modalBackdrop = document.querySelector('.basicLightbox');
  refs.modalBackdrop.addEventListener('click', onBackdropClose);

  refs.modalDetailsFilm = document.querySelector('.modal');
  refs.modalDetailsFilmButtonClose = refs.modalDetailsFilm.querySelector('.modal .btn__close');
  refs.modalDetailsFilmButtonClose.addEventListener('click', closeModalDetails);

  // *alex start
  refs.modalBox = document.querySelector('.modal__box');
  refs.currentCardId = refs.modalBox.getAttribute('data-id');
  refs.buttonWatch = document.querySelector('[data-anchor="watch"]');
  refs.buttonQueue = document.querySelector('[data-anchor="queue"]');
  refs.trailer = document.querySelector('[data-anchor="trailer"]');

  savedThemeOnReloadedModalCard();

  const localStorageLanguage = localStorage.getItem('language');

  const buttonValues = {
    addToWatchedRu: 'ДОБАВИТЬ В СМОТРЕЛ',
    addToWatchedEn: 'ADD TO WATCHED',
    addToQueueRu: 'ДОБАВИТЬ В ОЧЕРЕДЬ',
    addToQueueEn: 'ADD TO QUEUE',
    removeFromWatchedRu: 'УДАЛИТЬ ИЗ СМОТРЕЛ',
    removeFromWatchedEn: 'REMOVE FROM WATCHED',
    removeFromQueueEn: 'REMOVE FROM QUEUE',
    removeFromQueueRu: 'УДАЛИТЬ ИЗ ОЧЕРЕДИ',
    trailerRu: 'ТРЕЙЛЕР',
  };

  const chekWatchButtonValue = function () {
    if (localStorageLanguage === 'ru') {
      refs.buttonWatch.innerText = buttonValues.addToWatchedRu;
      refs.buttonQueue.innerText = buttonValues.addToQueueRu;
      refs.trailer.innerText = buttonValues.trailerRu;
    }
    const localStorageWatchKey = localStorage.getItem('watch');
    if (localStorageWatchKey === null || localStorageWatchKey.length === 0) {
      return;
    } else {
      const watch = getDataFromLocalStorage('watch');
      const matchedElement = watch.find(el => {
        return el.id === Number(refs.currentCardId);
      });

      if (matchedElement && localStorageLanguage === 'en') {
        refs.buttonWatch.innerText = buttonValues.removeFromWatchedEn;
      }
      if (matchedElement && localStorageLanguage === 'ru') {
        refs.buttonWatch.innerText = buttonValues.removeFromWatchedRu;
      }
    }
  };

  const chekQueueButtonValue = function () {
    const localStorageQueueKey = localStorage.getItem('queue');
    if (localStorageQueueKey === null || localStorageQueueKey.length === 0) {
      return;
    } else {
      const queue = getDataFromLocalStorage('queue');
      const matchedElement = queue.find(el => {
        return el.id === Number(refs.currentCardId);
      });

      if (matchedElement && localStorageLanguage === 'en') {
        refs.buttonQueue.innerText = buttonValues.removeFromQueueEn;
      }
      if (matchedElement && localStorageLanguage === 'ru') {
        refs.buttonQueue.innerText = buttonValues.removeFromQueueRu;
      }
    }
  };

  chekWatchButtonValue();
  chekQueueButtonValue();

  const addFilmToLibrary = e => {
    const buttonLabel = e.target.innerText; //Текст на кнопке
    const currentCardId = e.currentTarget.getAttribute('data-id'); //id текущей краты
    const btnValue = e.target.getAttribute('data-anchor'); //значение data-anchor
    getBtnValue(btnValue);

    if (
      buttonLabel === buttonValues.addToWatchedEn ||
      buttonLabel === buttonValues.addToWatchedRu
    ) {
      localStorageLanguage === 'en'
        ? (e.target.innerText = buttonValues.removeFromWatchedEn)
        : (e.target.innerText = buttonValues.removeFromWatchedRu);
      addDataToLocalStorage(currentCardId, btnValue);
      return;
    }

    if (
      buttonLabel === buttonValues.removeFromWatchedEn ||
      buttonLabel === buttonValues.removeFromWatchedRu
    ) {
      localStorageLanguage === 'en'
        ? (e.target.innerText = buttonValues.addToWatchedEn)
        : (e.target.innerText = buttonValues.addToWatchedRu);

      removeFromLibrary(btnValue, currentCardId);
      return;
    }

    if (buttonLabel === buttonValues.addToQueueEn || buttonLabel === buttonValues.addToQueueRu) {
      localStorageLanguage === 'en'
        ? (e.target.innerText = buttonValues.removeFromQueueEn)
        : (e.target.innerText = buttonValues.removeFromQueueRu);
      addDataToLocalStorage(currentCardId, btnValue);
      return;
    }

    if (
      buttonLabel === buttonValues.removeFromQueueEn ||
      buttonLabel === buttonValues.removeFromQueueRu
    ) {
      localStorageLanguage === 'en'
        ? (e.target.innerText = buttonValues.addToQueueEn)
        : (e.target.innerText = buttonValues.addToQueueRu);

      removeFromLibrary(btnValue, currentCardId);
      return;
    }
  };

  refs.modalBox.addEventListener('click', addFilmToLibrary);
  refs.modalBox.addEventListener('click', refreshLibrary);
  //* end alex
};

const getModalId = function (e) {
  e.preventDefault();
  const parentCard = e.target.closest('.result__link');
  if (!parentCard) {
    return;
  }
  const id = parentCard.dataset.id;
  showTrailer.id = id;
  getActiveInfo(id);
  addClassToElement(refs.body, 'no__scroll');
};

const showModal = function (markup) {
  target = basicLightbox.create(markup);
  target.show();
  window.addEventListener('keydown', onEscClose);

  showTrailer.show();
};

// CLOSE MODAL

const closeModalDetails = function () {
  removeClassFromElement(refs.body, 'no__scroll');
  refs.modalDetailsFilmButtonClose.removeEventListener('click', closeModalDetails);
  target.close();
};

const onEscClose = e => {
  if (e.code === 'Escape') {
    removeClassFromElement(refs.body, 'no__scroll');
    target.close();
  }
};

const onBackdropClose = e => {
  if (e.currentTarget === e.target) {
    removeClassFromElement(refs.body, 'no__scroll');
    window.removeEventListener('keydown', onEscClose);
  }
};

refs.resultAnchor.addEventListener('click', getModalId);
