import VanillaTilt from 'vanilla-tilt';

export const getCardsMarkup = () => {
  VanillaTilt.init(document.querySelectorAll('.card'), {
    max: 15,
    speed: 200,
    glare: true,
    'max-glare': 0.8,
    gyroscope: true,
  });
};
