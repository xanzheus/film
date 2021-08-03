const onMoreBtnClick = () => {
  document.querySelector('.tui-page-btn.tui-next').click();
};

export const getMarkupForLoadeMoreBtn = () => {
  const moreBtn = document.querySelector('.button-load-more');
  moreBtn.addEventListener('click', onMoreBtnClick);
};
