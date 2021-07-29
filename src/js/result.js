import refs from './refs';
import RequestService from './request.service';
import markupCarTrandingdTpl from '../templates/cardFilmTrandingTpl.hbs';
import {cardMoreLoad} from './cardLoadNextTpl.js';
import {setLibraryToLocalStorage} from './local-storage'


const requestService = new RequestService();

const setResults = (response) => {
 return response?.results
}

const makeMarkupCardList = () => {
    console.log(cardMoreLoad())    
    refs.resultAnchor.insertAdjacentHTML('beforeend', cardMoreLoad())
}

const makeMarkupCardsList = (array) => {    
    refs.resultAnchor.insertAdjacentHTML('beforeend', markupCarTrandingdTpl(array));
    makeMarkupCardList()
}



const makeValidatesReleaseDate = data => {
    return data.slice(0, 4);
}

const makefilterObject = ({poster_path, genre_ids,id, original_title, release_date, vote_average}) => {
    const newObject = {};
    newObject.poster_path = poster_path;
    newObject.genre_ids = genre_ids;
    newObject.id = id;
    newObject.original_title = original_title;
    newObject.release_date = release_date;
    newObject.vote_average = vote_average;
return newObject
}

const makefilterObjects = array => {
    const shortArray = array.map(makefilterObject)
    return shortArray
}

let genresList

const setGenresList = (array) => {
    genresList = [...array]
}

const makeValidatesGenreName = array => {
    array.forEach(object => {
        object.genre_ids.forEach(
            (idGenre, indexGenre) => {
                genresList.forEach(objectNames => {
                    if (objectNames.id === idGenre) {
                        object.genre_ids.splice(indexGenre, 1, objectNames['name'])
                    }                           
                })                        
            })
        })
    return array
    }

const makeGenresList = () => {
    requestService.getGenresMovies()
        .then(setGenresList)
}

const setValidatesPosterPath = (array) => {
    array.forEach(object => { object.poster_path = requestService.getPrefixUrlImg(object.poster_path) })
    return array
}

const setValidatesReleaseDate = (array) => {
    array.forEach(object => { object.release_date = makeValidatesReleaseDate(object.release_date) })
    return array
}

const clearCardsList = () => {
    refs.resultAnchor.innerHTML = '';
}

const renderingTrendingCardsList = () => {
    clearCardsList()
    requestService.getTrendingMovies()
        .then(setResults)
        .then(makefilterObjects)
        .then(setValidatesPosterPath)
        .then(setValidatesReleaseDate)
        .then(makeValidatesGenreName)
        .then(makeMarkupCardsList)
        // .then(makeMarkupCardsList)
}

const renderingLibraryCardsList = () => {
    clearCardsList()
    setLibraryToLocalStorage()//////функция от Леши
        .then(setResults)
        .then(makefilterObjects)
        .then(setValidatesPosterPath)
        .then(setValidatesReleaseDate)
        .then(makeValidatesGenreName)
        // .then(makeMarkupCardList)
}

makeGenresList();
renderingTrendingCardsList()

export { clearCardsList, renderingTrendingCardsList, renderingLibraryCardsList}