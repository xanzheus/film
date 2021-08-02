import refs from './refs';
import { loadSearchPage } from './result';
// import { trim } from 'jquery';

const searchMoviesHandler = () => {
  // const searchQuery = trim(refs.searchInput.value);

  // if (!searchQuery) {
  //   console.log('Empty request. Please enter what you want to find');
  //   return;
  // }

  loadSearchPage();
};

refs.inputButton.addEventListener('click', searchMoviesHandler);
