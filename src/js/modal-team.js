import team from './team-members.json';
import itemsTemplate from '../templates/cardsOurTeam.hbs';
import refs from './refs';
import { addClassToElement, removeClassFromElement } from './actions-functions';

refs.ftBtnEl.addEventListener('click', onCloseModal);
refs.ftLinkEl.addEventListener('click', onOpenModal);

function onCloseModal(event) {
  // console.log('click');
  refs.ftBackdropEl.classList.add('is-hidden');
}

function onOpenModal(event) {
  event.preventDefault();
  removeClassFromElement(refs.ftBackdropEl,'is-hidden');

}

const markUp = itemsTemplate(team);
refs.ftTeamListEl.insertAdjacentHTML('beforeend', markUp);
