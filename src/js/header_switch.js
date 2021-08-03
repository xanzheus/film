import refs from './refs';
import { addClassToElement, removeClassFromElement } from './actions-functions';
import {loadLibraryPage, loadHomePage, renderingLibrary} from './result';

const { homeLink, libraryLink, header, watchedButton, queueButton, controlWrapper, searchWrapper } =
  refs;

const NON_DISPLAYED_CLASS = 'non-displayed';
const AUTHORIZED_CLASS = 'authorized';
const NAVIGATION_CURRENT_CLASS = 'navigation__link--current';
const CONTROL_ACTIVE_CLASS = 'button-box__button--active';

const addAndRemoveClassesFromHeaderOnHomeLinkClickMentorFavoriteFunction = event => {
  event.preventDefault();

  removeClassFromElement(libraryLink, NAVIGATION_CURRENT_CLASS);
  addClassToElement(homeLink, NAVIGATION_CURRENT_CLASS);
  removeClassFromElement(header, AUTHORIZED_CLASS);

  addClassToElement(controlWrapper, NON_DISPLAYED_CLASS);
  removeClassFromElement(searchWrapper, NON_DISPLAYED_CLASS);

  removeClassFromElement(queueButton, CONTROL_ACTIVE_CLASS);
};

const addAndRemoveClassesFromHeaderOnLibraryLinkClick = event => {
  event.preventDefault();

  addClassToElement(libraryLink, NAVIGATION_CURRENT_CLASS);
  removeClassFromElement(homeLink, NAVIGATION_CURRENT_CLASS);

  addClassToElement(header, AUTHORIZED_CLASS);
  addClassToElement(watchedButton, CONTROL_ACTIVE_CLASS);

  removeClassFromElement(controlWrapper, NON_DISPLAYED_CLASS);
  addClassToElement(searchWrapper, NON_DISPLAYED_CLASS);
};

const addAndRemoveClassesFromHeaderOnWatchedLinkClick = event => {
  event.preventDefault();

  addClassToElement(watchedButton, CONTROL_ACTIVE_CLASS);
  removeClassFromElement(queueButton, CONTROL_ACTIVE_CLASS);
};

const addAndRemoveClassesFromHeaderOnQueueLinkClick = event => {
  event.preventDefault();

  addClassToElement(queueButton, CONTROL_ACTIVE_CLASS);
  removeClassFromElement(watchedButton, CONTROL_ACTIVE_CLASS);
};

const onHomeLinkClick = () => {
  document.querySelector('.logo__link').click();
};

homeLink.addEventListener(
  'click',
  addAndRemoveClassesFromHeaderOnHomeLinkClickMentorFavoriteFunction,
);
libraryLink.addEventListener('click', addAndRemoveClassesFromHeaderOnLibraryLinkClick);

watchedButton.addEventListener('click', addAndRemoveClassesFromHeaderOnWatchedLinkClick);
queueButton.addEventListener('click', addAndRemoveClassesFromHeaderOnQueueLinkClick);

homeLink.addEventListener('click', onHomeLinkClick);

homeLink.addEventListener('click', loadHomePage);
libraryLink.addEventListener('click', loadLibraryPage);
queueButton.addEventListener('click', renderingLibrary);
watchedButton.addEventListener('click', renderingLibrary);
