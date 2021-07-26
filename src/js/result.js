import refs from './refs';
import RequestService from './request.service';
import markupCardTpl from '../templates/cardFilmTpl.hbs';

const requestService = new RequestService();
const IMG__URL = 'https://image.tmdb.org/t/p/w500';

const makeMarkupCardsList = (array) => {
    refs.resultAnchor.insertAdjacentHTML('beforeend', markupCardTpl(array))
}

const makeValidatesPosterPath = url => {
    return `${IMG__URL}${url}`;
}

const makeValidatesReleaseDate = data => {
    return data.slice(0, 4);
}

const makeValidatesGenreName = array => {
    array.forEach(object => {
        object.genre_names = [];
        object.genre_ids.forEach(
            (idGenre, indexGenre, arrayMain) => {
                requestService.getGenresMovies()
                    .then(array => {
                        array.forEach(objectNames => {
                            if (objectNames.id === idGenre) {
                                // object.genre_ids.splice(indexGenre, 1, objectNames['name'])
                                
                                object.genre_names.push(objectNames['name'])
                                // console.log(object.genre_names)
                            }
                           
                        });
                        
                    })
                // console.log(array)
                // console.log(array)
                makeMarkupCardsList(array)
            })
    })
    // makeMarkupCardsList(array)
}

// const setValidatesPosterPath = (array) => {
//     array.forEach(object => { object.poster_path = makeValidatesPosterPath(object.poster_path) })
//     return array
// }

const setValidatesPosterPath = (array) => {
    array.forEach(object => { object.poster_path = makeValidatesPosterPath(object.poster_path) })
    return array
}

const setValidatesReleaseDate = (array) => {
    array.forEach(object => { object.release_date = makeValidatesReleaseDate(object.release_date) })
    return array
}

const renderingTrendingCardsList = () => {
    // const requestService = new RequestService();
    requestService.getTrendingMovies()
        .then(setValidatesPosterPath)
        .then(setValidatesReleaseDate)
        .then(makeValidatesGenreName)
        // .then(array => { console.log(array[0].genre_names); return array })
    // .then(console.log)
        // .then(makeMarkupCardsList);
}

const clearCardsList = () => {
    refs.resultAnchor.innerHTML = '';
}

renderingTrendingCardsList()

export { clearCardsList, renderingTrendingCardsList}