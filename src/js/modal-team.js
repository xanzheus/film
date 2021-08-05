import team from './team-members.json';
import itemsTemplate from '../templates/cardsOurTeam.hbs';
import refs from './refs';
import { addClassToElement, removeClassFromElement } from './actions-functions';

const onEscCloseTeam = (e) => {
  if (e.code === 'Escape') {
    removeClassFromElement(refs.body, 'no__scroll');
    onCloseModal(e)
  }
};

const onBackdropClose = e => {
  if (e.currentTarget === e.target) {
    removeClassFromElement(refs.body,'no__scroll');
    window.removeEventListener('keydown', onEscCloseTeam);
    onCloseModal(e)
  }
};

const  onCloseModal = () => {
  addClassToElement(refs.ftBackdropEl, 'is-hidden');
  removeClassFromElement(refs.body, 'no__scroll')

}

const  onOpenModal = (event) => {
  event.preventDefault();
  removeClassFromElement(refs.ftBackdropEl,'is-hidden');
  addClassToElement(refs.body, 'no__scroll')
  window.addEventListener('keydown', onEscCloseTeam);

}

const markUp = itemsTemplate(team);
refs.ftTeamListEl.insertAdjacentHTML('beforeend', markUp);
refs.ftBtnEl.addEventListener('click', onCloseModal);
refs.ftLinkEl.addEventListener('click', onOpenModal);
refs.ftBackdropEl.addEventListener('click', onBackdropClose);
