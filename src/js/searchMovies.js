import refs from './refs';
import { renderingSearchCardsList } from './result';
import { trim } from 'jquery';

const searchMoviesHandler = () => {
  const searchQuery = trim(refs.searchInput.value);

  if (!searchQuery) {
    console.log('Empty request. Please enter what you want to find');
    return;
  }

  renderingSearchCardsList(searchQuery);
};

refs.inputButton.addEventListener('click', searchMoviesHandler);
