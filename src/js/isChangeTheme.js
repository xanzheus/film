import refs from './refs';
import { loadHomePage } from './result';

export const Theme = {
  LIGHT: 'light__theme',
  DARK: 'dark__theme',
};

export const STORAGE_KEY = 'theme';

function onCheckboxClick(evt) {
  let value = '';
  if (evt.currentTarget.checked) {
    value = Theme.DARK;
    refs.body.classList.add(value);
    refs.body.classList.remove(Theme.LIGHT);
    loadHomePage();
  } else {
    value = Theme.LIGHT;
    refs.body.classList.remove(Theme.DARK);
    refs.body.classList.add(value);
    loadHomePage();
  }
  localStorage.setItem(STORAGE_KEY, value);
}

function savedThemeOnReloaded() {
  const savedValue = localStorage.getItem(STORAGE_KEY);

  if (savedValue) {
    refs.body.classList.add(savedValue);
  } else {
    refs.body.classList.add(Theme.LIGHT);
  }

  if (savedValue === Theme.DARK) {
    refs.checkBox.setAttribute('checked', true);
  }
}

savedThemeOnReloaded();

refs.checkBox.addEventListener('change', onCheckboxClick);
