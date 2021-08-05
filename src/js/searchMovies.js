import refs from './refs';
import { loadSearchPage } from './result';

const searchMoviesHandler = (e) => {
  e.preventDefault()
  loadSearchPage();
};

refs.inputButton.addEventListener('click', searchMoviesHandler);
