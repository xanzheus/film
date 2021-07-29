import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import refs from './refs';
import requestService from './request.service';
import { makeMarkup } from './modal-details-film-tpl';
import { ShowTrailer } from './_trailer_to_film';
const showTrailer = new ShowTrailer();

const request = new requestService();

const getMoreDetailfilm = function ({
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
  descriptionFilm.title = title;
  descriptionFilm.poster_path = poster_path;
  descriptionFilm.vote_average = vote_average;
  descriptionFilm.vote_count = vote_count;
  descriptionFilm.popularity = popularity;
  descriptionFilm.original_title = original_title;
  descriptionFilm.overview = overview;
  descriptionFilm.genres = genres
    .reduce((acc, genre) => {
      return `${acc}${genre.name}, `;
    }, '')
    .slice(0, -2);
  return descriptionFilm;
};

const setValidatesBackdrop_path = obj => {
  obj.poster_path = request.getPrefixUrlImg(obj.poster_path);
  return obj;
};

const doActionsShowModal = function (markup) {
  showModal(markup);
  refs.modalDetailsFilm = document.querySelector('.modal');
  refs.modalDetailsFilmButtonClose = refs.modalDetailsFilm.querySelector('.modal .btn__close');
  refs.modalDetailsFilmButtonClose.addEventListener('click', closeModalDetails);
};

const getActiveInfo = function (id) {
  return request
    .getDescriptionMovie(id)
    .then(getMoreDetailfilm)
    .then(setValidatesBackdrop_path)
    .then(makeMarkup)
    .then(doActionsShowModal);
};

let target = '';

const showModal = function (markup) {
  target = basicLightbox.create(markup);
  target.show();

  showTrailer.show();
};

const closeModalDetails = function () {
  target.close();
  refs.modalDetailsFilmButtonClose.removeEventListener('click', closeModalDetails);
};

const renderModal = function (e) {
  const id = e.target.dataset.id;
  getActiveInfo(id);
  showTrailer.id = id;
};

refs.resultAnchor.addEventListener('click', renderModal);
