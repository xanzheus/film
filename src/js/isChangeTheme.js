import refs from './refs';
import { loadHomePage } from './result';
import { addClassToElement, removeClassFromElement } from './actions-functions';

export const Theme = {
  LIGHT: 'light__theme',
  DARK: 'dark__theme',
};

export const STORAGE_KEY = 'theme';

const onCheckboxClick = evt => {
  let value = '';
  if (evt.currentTarget.checked) {
    value = Theme.DARK;
    addClassToElement(refs.body, value);
    removeClassFromElement(refs.body, Theme.LIGHT);
    addClassToElement(refs.footer, value);
    removeClassFromElement(refs.footer, Theme.LIGHT);
    addClassToElement(refs.modalTeam, value);
    removeClassFromElement(refs.modalTeam, Theme.LIGHT);
    loadHomePage();
  } else {
    value = Theme.LIGHT;
    removeClassFromElement(refs.body, Theme.DARK);
    addClassToElement(refs.body, value);
    removeClassFromElement(refs.footer, Theme.DARK);
    addClassToElement(refs.footer, value);
    removeClassFromElement(refs.modalTeam, Theme.DARK);
    addClassToElement(refs.modalTeam, value);
    loadHomePage();
  }
  localStorage.setItem(STORAGE_KEY, value);
};

const savedThemeOnReloaded = () => {
  const savedValue = localStorage.getItem(STORAGE_KEY);

  if (savedValue) {
    addClassToElement(refs.body, savedValue);
    addClassToElement(refs.footer, savedValue);
    addClassToElement(refs.modalTeam, savedValue);
  } else {
    addClassToElement(refs.body, Theme.LIGHT);
    addClassToElement(refs.footer, Theme.LIGHT);
    addClassToElement(refs.modalTeam, Theme.LIGHT);
  }

  if (savedValue === Theme.DARK) {
    refs.checkBox.setAttribute('checked', true);
  }
};

export const savedThemeOnReloadedModalCard = () => {
  const savedValue = localStorage.getItem(STORAGE_KEY);

  if (savedValue) {
    addClassToElement(refs.modalDetailsFilm, savedValue);
  } else {
    addClassToElement(refs.modalDetailsFilm, Theme.LIGHT);
  }

  if (savedValue === Theme.DARK) {
    refs.checkBox.setAttribute('checked', true);
  }
};

savedThemeOnReloaded();

refs.checkBox.addEventListener('change', onCheckboxClick);
