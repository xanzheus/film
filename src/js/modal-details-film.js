import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/src/styles/main.scss'
import refs from './refs';
import requestService from './request.service'
import {makeMarkup} from './modal-details-film-tpl'

const request = new requestService

const getMoreDetailfilm = function ({title, poster_path, vote_average, vote_count, popularity, original_title, overview,genres}) {
    const descriptionFilm = {}
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
    
     const id =e.target.dataset.id
    getActiveInfo(id)
    document.body.classList.add('no__scroll');
}

const showModal = function (markup) {
   target = basicLightbox.create(markup);
    target.show()
    
}
 
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
}
}

refs.resultAnchor.addEventListener('click', getModalId);
window.addEventListener('keydown',onEscClose)