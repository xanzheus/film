import * as basicLightbox from 'basiclightbox';
const axios = require('axios');
import { API__KEY } from './request.service';

function showTrailerToFilm(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?${API__KEY}&language=en-US`;
  axios
    .get(url)
    .then(response => {
      const id = response?.data?.results[0].key;
      const instance = basicLightbox.create(`
  <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
      instance.show();
    })
    .catch(() => {
      const instance = basicLightbox.create(`
        <iframe width="560" height="315" src='https://www.youtube.com/embed/TSXXi2kvl_0'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `);
      instance.show();
    });
}

export class ShowTrailer {
  constructor(id) {
    this.id = id;
  }
  show() {
    const btn = document.querySelector('[data-anchor="trailer"]');
    btn.addEventListener('click', () => {
      showTrailerToFilm(this.id);
    });
  }
}
