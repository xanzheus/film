import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/src/styles/main.scss'
import refs from './refs';
import requestService from './request.service'
import {makeMarkup} from './modaltpl'
import { func } from 'assert-plus';

const request = new requestService



const getMoreDetailfilm = function (description) {
    const description_film = {}
    description_film.title = description.title,
    description_film.poster_path = description.poster_path
    description_film.vote_average= description.vote_average,
    description_film.vote_count = description.vote_count,
    description_film.popularity = description.popularity,
    description_film.original_title = description.original_title,
    description_film.overview = description.overview
    description_film.genres = description.genres.map(genre => {return genre.name})
    console.log(description_film.genres)
    return description_film
}




const setValidatesBackdrop_path = (obj) => {
    console.log(request.getPrefixUrlImg(obj.poster_path))
    obj.poster_path = request.getPrefixUrlImg(obj.poster_path)
      return obj
}

const getActiveInfo = function (id) {
    return request.getDescriptionMovie(id)
        .then(getMoreDetailfilm)
        .then(setValidatesBackdrop_path)
        .then(makeMarkup)
        .then(actionsShowModal)
        
}

 
let target = ''

const showModal = function (markup) {
   target = basicLightbox.create(markup);
    target.show()
}
 
const closeModalDetails = function ()  {
    target.close()
     refs.modalDetailsFilmButtonClose.removeEventListener('click',closeModalDetails)
}

const actionsShowModal = function (markup) {
    showModal(markup);
    refs.modalDetailsFilm = document.querySelector('.modal')
    refs.modalDetailsFilmButtonClose = refs.modalDetailsFilm.querySelector('.modal .btn__close')
    refs.modalDetailsFilmButtonClose.addEventListener('click',closeModalDetails)
}





 const renderModal = function (e) {
     const id =e.target.dataset.id
    getActiveInfo(id)
}

refs.resultAnchor.addEventListener('click', renderModal);

