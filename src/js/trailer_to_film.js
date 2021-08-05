import * as basicLightbox from 'basiclightbox';
const axios = require('axios');
import { API__KEY } from './request.service';
import toastr from 'toastr';
import tosrtOption from './toastr';

function showTrailerToFilm(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?${API__KEY}&language=en-US`;
  axios
    .get(url)
    .then(response => {
      const id = response?.data?.results[0].key;
      const instance = basicLightbox.create(
        `
  <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`,
      );
      const closeVideo = e => {
        if (e.code !== 'Escape') {
          return;
        } else {
          instance.close();
        }
        window.removeEventListener('keydown', closeVideo);
      };

      instance.show(() => {
        window.addEventListener('keydown', closeVideo);
      });
    })
    .catch(() => {
      const lang = localStorage.getItem('language');
      let warningStr = lang === 'en'
                  ? 'Sorry: Trailer not finded'
                  : 'Извините, трейлер не найден';

      const instance = basicLightbox.create(
        `
        <iframe width="560" height="315" src='https://www.youtube.com/embed/TSXXi2kvl_0'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `,
        toastr.warning(warningStr),
      );
      const closeVideo = e => {
        if (e.code !== 'Escape') {
          return;
        } else {
          instance.close();
        }
        window.removeEventListener('keydown', closeVideo);
      };

      instance.show(() => {
        window.addEventListener('keydown', closeVideo);
      });
    });
}

export class ShowTrailer {
  constructor(id) {
    this.id = id;
  }
  show() {
    const onClickBtn = () => {
      showTrailerToFilm(this.id);
    };
    const btn = document.querySelector('[data-anchor="trailer"]');
    btn.addEventListener('click', onClickBtn);
  }
}
