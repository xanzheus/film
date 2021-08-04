import VanillaTilt from 'vanilla-tilt';
import refs from './refs';

const options = {
  max: 15,
  speed: 200,
  glare: true,
  'max-glare': 0.4,
  gyroscope: true,
};

const STORAGE_KEY = 'theme';
const Theme = {
  LIGHT: 'light__theme',
  DARK: 'dark__theme',
};

export const getCardsMarkup = () => {
  const cards = document.querySelectorAll('.card');
  const savedValue = localStorage.getItem(STORAGE_KEY);

  if (savedValue === Theme.DARK) {
    VanillaTilt.init(cards);
  }

  VanillaTilt.init(cards, options);
};
