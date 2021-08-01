import VanillaTilt from 'vanilla-tilt';

const options = {
  max: 15,
  speed: 200,
  glare: true,
  'max-glare': 0.4,
  gyroscope: true,
};

export const getCardsMarkup = () => {
  const cards = document.querySelectorAll('.card');
  VanillaTilt.init(cards, options);
};
