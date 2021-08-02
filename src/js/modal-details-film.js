import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import refs from './refs';
import requestService from './request.service';
import { makeMarkup } from './modal-details-film-tpl';
import { ShowTrailer } from './_trailer_to_film';

const getMoreDetailfilm = function ({id, title, poster_path, vote_average, vote_count, popularity, original_title, overview,genres}) {
    const descriptionFilm = {}
    descriptionFilm.id = id;
    descriptionFilm.title = title;
    descriptionFilm.poster_path = poster_path;
    descriptionFilm.vote_average = vote_average.toFixed(1);
    descriptionFilm.vote_count = vote_count.toFixed(1);
    descriptionFilm.popularity = popularity.toFixed(1);
    descriptionFilm.original_title = original_title;
    descriptionFilm.overview = overview;
    descriptionFilm.genres = genres.reduce((acc, genre) => { return `${acc}${genre.name}, ` }, '').slice(0, -2);
    return descriptionFilm
}

let target = ''
const showTrailer = new ShowTrailer();
const request = new requestService();

// IMAGE PATH

const setValidatesBackdrop_path = (obj) => {
    obj.poster_path = request.getPrefixUrlImg(obj.poster_path)
      return obj
}

// API
const getActiveInfo = function (id) {

    return request.getDescriptionMovie(id)
        .then(getMoreDetailfilm)
        .then(setValidatesBackdrop_path)
        .then(makeMarkup)
        .then(doActionsShowModal)        
}
 
// SHOW MODAL

const doActionsShowModal = function (markup) {
    showModal(markup);
    refs.modalBackdrop = document.querySelector('.basicLightbox');
    refs.modalBackdrop.addEventListener('click', onBackdropClose);

    refs.modalDetailsFilm = document.querySelector('.modal');
    refs.modalDetailsFilmButtonClose = refs.modalDetailsFilm.querySelector('.modal .btn__close');

    refs.modalDetailsFilmButtonClose.addEventListener('click', closeModalDetails);
}

const getModalId = function (e) {
    const parentCard = e.target.closest('.card')
    if (!parentCard) {
        return
    }
    const id = parentCard.dataset.id
    showTrailer.id = id
    getActiveInfo(id)
    document.body.classList.add('no__scroll');
       
}

const showModal = function (markup) {
  target = basicLightbox.create(markup);
  target.show();

  showTrailer.show();
};
 
// CLOSE MODAL

const closeModalDetails = function () {
    document.body.classList.remove('no__scroll');
    refs.modalDetailsFilmButtonClose.removeEventListener('click', closeModalDetails)
    target.close()
}

const onEscClose = e => {
    if (e.code === 'Escape') {
        document.body.classList.remove('no__scroll');
        target.close()
    }
}

const onBackdropClose = e => {
    if (e.currentTarget === e.target) {
        document.body.classList.remove('no__scroll');
        window.removeEventListener('keydown',onEscClose)
}
}

refs.resultAnchor.addEventListener('click', getModalId);
window.addEventListener('keydown',onEscClose)

