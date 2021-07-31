import refs from './refs';

const {homeLink, libraryLink, header, watchedButton, queueButton, controlWrapper, searchWrapper} = refs;

const NON_DISPLAYED_CLASS = 'non-displayed';
const AUTHORIZED_CLASS = 'authorized';
const NAVIGATION_CURRENT_CLASS = 'navigation__link--current';
const CONTROL_ACTIVE_CLASS = 'button-box__button--active';

const addAndRemoveClassesFromHeaderOnHomeLinkClickMentorFavoriteFunction = (event) => {
    event.preventDefault();

    libraryLink.classList.remove(NAVIGATION_CURRENT_CLASS);
    homeLink.classList.add(NAVIGATION_CURRENT_CLASS);
    header.classList.remove(AUTHORIZED_CLASS);

    controlWrapper.classList.add(NON_DISPLAYED_CLASS);
    searchWrapper.classList.remove(NON_DISPLAYED_CLASS);

    watchedButton.classList.remove(CONTROL_ACTIVE_CLASS);
    queueButton.classList.remove(CONTROL_ACTIVE_CLASS);
};

const addAndRemoveClassesFromHeaderOnLibraryLinkClick = (event) => {
    event.preventDefault();

    libraryLink.classList.add(NAVIGATION_CURRENT_CLASS);
    homeLink.classList.remove(NAVIGATION_CURRENT_CLASS);
    header.classList.add(AUTHORIZED_CLASS);

    controlWrapper.classList.remove(NON_DISPLAYED_CLASS);
    searchWrapper.classList.add(NON_DISPLAYED_CLASS);
};

const addAndRemoveClassesFromHeaderOnWatchedLinkClick = (event) => {
    event.preventDefault();

    watchedButton.classList.add(CONTROL_ACTIVE_CLASS);
    queueButton.classList.remove(CONTROL_ACTIVE_CLASS);
};

const addAndRemoveClassesFromHeaderOnQueueLinkClick = (event) => {
    event.preventDefault();

    queueButton.classList.add(CONTROL_ACTIVE_CLASS);
    watchedButton.classList.remove(CONTROL_ACTIVE_CLASS);
};

console.log(homeLink);
console.log(libraryLink);


homeLink.addEventListener('click', addAndRemoveClassesFromHeaderOnHomeLinkClickMentorFavoriteFunction);
libraryLink.addEventListener('click', addAndRemoveClassesFromHeaderOnLibraryLinkClick);

watchedButton.addEventListener('click', addAndRemoveClassesFromHeaderOnWatchedLinkClick);
queueButton.addEventListener('click', addAndRemoveClassesFromHeaderOnQueueLinkClick);