import { renderingSearchCardsList } from "./result";

const homeLink = document.querySelector('#home-link');
const libraryLink = document.querySelector('#library-link');
const header = document.querySelector('header');
const watchedButton = document.querySelector('#watched-button');
const queueButton = document.querySelector('#queue-button');
const controlWrapper = document.querySelector('.control__wrapper');
const searchWrapper = document.querySelector('.search__wrapper');

const NON_DISPLAYED_CLASS = 'non-displayed';
const AUTHORIZED_CLASS = 'authorized';
const NAVIGATION_CURRENT_CLASS = 'navigation__link--current';
const CONTROL_ACTIVE_CLASS = 'control__button--active';

const onHomeLinkClick = (event) => {
    event.preventDefault();

    libraryLink.classList.remove(NAVIGATION_CURRENT_CLASS);
    homeLink.classList.add(NAVIGATION_CURRENT_CLASS);
    header.classList.remove(AUTHORIZED_CLASS);

    controlWrapper.classList.add(NON_DISPLAYED_CLASS);
    searchWrapper.classList.remove(NON_DISPLAYED_CLASS);
}

const onLibraryLinkClick = (event) => {
    event.preventDefault();

    libraryLink.classList.add(NAVIGATION_CURRENT_CLASS);
    homeLink.classList.remove(NAVIGATION_CURRENT_CLASS);
    header.classList.add(AUTHORIZED_CLASS);

    controlWrapper.classList.remove(NON_DISPLAYED_CLASS);
    searchWrapper.classList.add(NON_DISPLAYED_CLASS);
}

const onWatchedButtonClick = (event) => {
    event.preventDefault();

    watchedButton.classList.add(CONTROL_ACTIVE_CLASS);
    queueButton.classList.remove(CONTROL_ACTIVE_CLASS);
}

const onQueueButtonClick = (event) => {
    event.preventDefault();

    queueButton.classList.add(CONTROL_ACTIVE_CLASS);
    watchedButton.classList.remove(CONTROL_ACTIVE_CLASS);
}

homeLink.addEventListener('click', onHomeLinkClick);
libraryLink.addEventListener('click', onLibraryLinkClick);

watchedButton.addEventListener('click', onWatchedButtonClick);
queueButton.addEventListener('click', onQueueButtonClick);