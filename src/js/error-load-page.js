import refs from './refs';
import toastr from 'toastr';
import tosrtOption from './toastr';

const addErrorStartLoad = () => {
  refs.resultSection.style.minHeight = '60vh';
  refs.resultSection.style.backgroundImage =
    'url(https://live.staticflickr.com/65535/51352508915_15a8e1d55a_n.jpg)';
  refs.resultSection.style.backgroundRepeat = 'no-repeat';
  refs.resultSection.style.backgroundPosition = 'top center';
  refs.resultSection.style.overflow = 'hidden';
  refs.resultSection.style.backgroundSize = 'contain';
  refs.resultSection.style.backgroundPosition = 'center center';
  const lang = localStorage.getItem('language');
  let warningStr = lang === 'en'
          ? 'Sorry: Movie not found.'
          : 'Извините, фильм не найден.';

  toastr.warning(warningStr);
};

const removeErrorStartLoad = () => {
  refs.resultSection.style.minHeight = '0';
  refs.resultSection.style.backgroundImage = 'none';
  refs.resultSection.style.backgroundRepeat = 'no-repeat';
  refs.resultSection.style.backgroundPosition = 'top center';
  refs.resultSection.style.overflow = 'hidden';
  refs.resultSection.style.backgroundSize = 'contain';
  refs.resultSection.style.backgroundPosition = 'center center';
};

export { addErrorStartLoad, removeErrorStartLoad };
