import * as basicLightbox from 'basiclightbox';
import { API__KEY } from './request.service';

function showTrailerToFilm(id) {
  const ApiKey = '92ffb34e08e714eb390805a25b0a06d3';
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?${API__KEY}&language=en-US`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const id = data.results[0].key;
      const instance = basicLightbox.create(`
  <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
      instance.show();
    });
}

export class ShowTrailer {
  constructor(id) {
    this.id = id;
  }
  show() {
    const btn = document.querySelector('.button__trailer');
    btn.addEventListener('click', () => {
      showTrailerToFilm(this.id);
    });
  }
}
