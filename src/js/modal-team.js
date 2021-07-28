const btnEl = document.querySelector('.modal-close-btn');
const backdrobEl = document.querySelector('.modal-backdrop');
const linkEl = document.querySelector('.footer__link');
btnEl.addEventListener('click', onBtnCkick);
linkEl.addEventListener('click', onLinkClick);

function onBtnCkick(event) {
  console.log('click');
  backdrobEl.classList.add('is-hidden');
}

function onLinkClick(event) {
  event.preventDefault();
  backdrobEl.classList.remove('is-hidden');
}
