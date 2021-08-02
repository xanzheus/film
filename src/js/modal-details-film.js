import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import refs from './refs';
import requestService from './request.service';
import { makeMarkup } from './modal-details-film-tpl';
import { ShowTrailer } from './_trailer_to_film';

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

  // console.log(refs.currentCardId);

  const chekWatchButtonValue = function () {
    const localStorageWatchKey = localStorage.getItem('watch');
    if (localStorageWatchKey === null || localStorageWatchKey.length === 0) {
      return;
    } else {
      const watch = getDataFromLocalStorage('watch');
      const matchedElement = watch.find(el => {
        return el.id === Number(refs.currentCardId);
      });
      if (matchedElement) {
        refs.buttonWatch.innerText = 'REMOVE FROM WATCHED';
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
      if (matchedElement) {
        refs.buttonQueue.innerText = 'REMOVE FROM WATCHED';
      }
    }
  };

  chekWatchButtonValue();
  chekQueueButtonValue();

  refs.modalBox.addEventListener('click', e => {
    const buttonLabel = e.target.innerText; //Текст на кнопке
    const currentCardId = e.currentTarget.getAttribute('data-id'); //id текущей краты
    const btnValue = e.target.getAttribute('data-anchor'); //значение data-anchor
    getBtnValue(btnValue);

    if (buttonLabel === 'ADD TO WATCHED') {
      e.target.innerText = 'REMOVE FROM WATCHED';
      addDataToLocalStorage(currentCardId, btnValue);
    }

    if (buttonLabel === 'REMOVE FROM WATCHED') {
      e.target.innerText = 'ADD TO WATCHED';
      removeFromLibrary(btnValue, currentCardId);
    }

    if (buttonLabel === 'ADD TO QUEUE') {
      e.target.innerText = 'REMOVE FROM QUEUE';
      addDataToLocalStorage(currentCardId, btnValue);
    }

    if (buttonLabel === 'REMOVE FROM QUEUE') {
      e.target.innerText = 'ADD TO QUEUE';
      removeFromLibrary(btnValue, currentCardId);
    }
    // console.log(e.target);
  });

  //* end alex
};

const getModalId = function (e) {
  const id = e.target.dataset.id;
  showTrailer.id = id;
  getActiveInfo(id);
  document.body.classList.add('no__scroll');
};

const showModal = function (markup) {
  target = basicLightbox.create(markup);
  target.show();

  showTrailer.show();
};

// CLOSE MODAL

const closeModalDetails = function () {
  document.body.classList.remove('no__scroll');
  refs.modalDetailsFilmButtonClose.removeEventListener('click', closeModalDetails);
  target.close();
};

const onEscClose = e => {
  if (e.code === 'Escape') {
    document.body.classList.remove('no__scroll');
    target.close();
  }
};

const onBackdropClose = e => {
  if (e.currentTarget === e.target) {
    document.body.classList.remove('no__scroll');
    window.removeEventListener('keydown', onEscClose);
  }
};

refs.resultAnchor.addEventListener('click', getModalId);
window.addEventListener('keydown', onEscClose);
