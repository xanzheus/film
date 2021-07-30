import { addBackToTop } from 'vanilla-back-to-top';
addBackToTop({
  backgroundColor: '#000',
  cornerOffset: 20,
  diameter: 56,
  id: 'back-to-top',
  onClickScrollTo: 0,
  scrollContainer: document.body,
  scrollDuration: 400,
  showWhenScrollTopIs: 400,
  textColor: '#fff',
  zIndex: 1,
});
