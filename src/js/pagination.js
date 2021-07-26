import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import RequestService from './request.service';
const requestServise = new RequestService();

// ref
const container = document.querySelector('.pagination');

export default function renderPagination(totalItems, murkup) {
  const options = {
    totalItems,
    itemsPerPage: 1,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    requestServise.page = currentPage;

    requestServise.getTrendingMovies().then(data => {
      console.log(data);
      console.log(murkup);
    });
  });
}
