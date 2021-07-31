import refs from './refs';
import { clearCardsList, renderingSearchCardsList } from './result';
import RequestService from './request.service';
import { trim } from 'jquery';

const requestService = new RequestService();

const searchMoviesHandler = () => {
  const searchQuery = trim(refs.searchInput.value);

  if (!searchQuery) {
    console.log('Empty request. Please enter what you want to find');
    return;
  }

  renderingSearchCardsList(searchQuery);
};

refs.inputButton.addEventListener('click', searchMoviesHandler);
