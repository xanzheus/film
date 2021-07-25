import refs from './refs';
import RequestService from './request.service';
import markupCardTpl from '../templates/cardFilmTpl.hbs';

const makeMarkupCardsList = (array) => {
    // console.log('1212')

    refs.resultAnchor.insertAdjacentHTML('beforeend', markupCardTpl(array))
    // console.log(refs.resultAnchor)
}

const renderingTrendingCardsList = () => {
    const requestService = new RequestService();
    requestService.getTrendingMovies()
        // .then(console.log)
        .then(ar => makeMarkupCardsList(ar));
}

const clearCardsList = () => {
    refs.resultAnchor.innerHTML = '';
}

renderingTrendingCardsList()

export { clearCardsList, renderingTrendingCardsList}