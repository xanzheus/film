import team from './team-members.json';
import itemsTemplate from '../templates/cardsOurTeam.hbs';
import refs from './refs';
import { addClassToElement, removeClassFromElement } from './actions-functions';

refs.ftLinkEl.addEventListener('click', onOpenModal);
refs.ftBtnEl.addEventListener('click', onCloseModalBtn);
refs.ftBackdropEl.addEventListener('click', onCloseModalBackdrop);
window.addEventListener('keydown', onCloseModalEsc);

function onCloseModalBtn(event) {
  refs.ftBackdropEl.classList.add('is-hidden');
}

function onCloseModalEsc(event) {
  if (event.code === 'Escape') {
    console.log('Escape');
    refs.ftBackdropEl.classList.add('is-hidden');
  }
}

function onCloseModalBackdrop(event) {
  if (event.target === event.currentTarget) {
    refs.ftBackdropEl.classList.add('is-hidden');
  }
}

function onOpenModal(event) {
  event.preventDefault();
  removeClassFromElement(refs.ftBackdropEl, 'is-hidden');
}

const markUp = itemsTemplate(team);
refs.ftTeamListEl.insertAdjacentHTML('beforeend', markUp);
