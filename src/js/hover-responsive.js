import VanillaTilt from 'vanilla-tilt';
import { Theme, STORAGE_KEY } from './isChangeTheme';

const options = {
  max: 15,
  speed: 200,
  glare: true,
  'max-glare': 0.4,
  gyroscope: true,
};

export const getCardsMarkup = () => {
  const cards = document.querySelectorAll('.card');
  const savedValue = localStorage.getItem(STORAGE_KEY);

  if (savedValue === Theme.DARK) {
    VanillaTilt.init(cards);
  }

  VanillaTilt.init(cards, options);
};
