export default {
  main: document.querySelector('main'),
  resultSection: document.querySelector('.result .container'),
  resultAnchor: document.querySelector('[data-anchor="result"]'),
  loader: document.querySelector('.whirly-loader__wrapper'),
  btnLoadMore: document.querySelector('.button-load-more'),
  ftBtnEl: document.querySelector('.button-close'),
  ftBackdropEl: document.querySelector('.modal-backdrop'),
  ftLinkEl: document.querySelector('.footer__link'),
  ftTeamListEl: document.querySelector('.js-team__list'),
  modalDetailsFilm: '',
  modalDetailsFilmButtonClose: '',
  modalBackdrop: '',
  paginationAnchorRef: document.getElementById('tui-pagination-container'),
  searchInput: document.getElementById('search-input'),
  inputButton: document.querySelector('.search__button'),
  homeLink: document.querySelector('#home-link'),
  libraryLink: document.querySelector('#library-link'),
  header: document.querySelector('header'),
  watchedButton: document.querySelector('#watch'),
  queueButton: document.querySelector('#queue'),
  controlWrapper: document.querySelector('.button-box__wrapper'),
  searchWrapper: document.querySelector('.search__wrapper'),
  errorWrapper: document.querySelector('.error-box__wrapper'),
};
