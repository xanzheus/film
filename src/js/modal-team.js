import team from './team-members.json';
import itemsTemplate from '../templates/cardsOurTeam.hbs';
import refs from './refs';
import { addClassToElement, removeClassFromElement } from './actions-functions';

refs.ftLinkEl.addEventListener('click', onOpenModal);
refs.ftBtnEl.addEventListener('click', onCloseModalBtn);
refs.ftBackdropEl.addEventListener('click', onCloseModalBackdrop);
window.addEventListener('keydown', onCloseModalEsc);

function onCloseModal() {
  addClassToElement(refs.ftBackdropEl, 'is-hidden');
}

function onCloseModalBtn(event) {
  onCloseModal();
  removeClassFromElement(refs.body, 'no__scroll');
}

function onCloseModalEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
    removeClassFromElement(refs.body, 'no__scroll');
  }
}

function onCloseModalBackdrop(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
    removeClassFromElement(refs.body, 'no__scroll');
  }
}

function onOpenModal(event) {
  event.preventDefault();
  removeClassFromElement(refs.ftBackdropEl, 'is-hidden');
  addClassToElement(refs.body, 'no__scroll');
}

const markUp = itemsTemplate(team);
refs.ftTeamListEl.insertAdjacentHTML('beforeend', markUp);
