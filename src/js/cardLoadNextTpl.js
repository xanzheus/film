const cardMoreLoad = () => {
    const langShow = localStorage.getItem('language');
    let langHide = langShow === 'en'
                ? 'ru'
                : 'en';

    const markup = `<li class="result__item card__load-more">
                            <button type="button" class="button-load-more">
                                <p class="card-load-more__text">
                                    <span lang='${langShow}'>Load more</span>
                                    <span lang='${langHide}'>Показать больше</span>
                                </p>
                                <p class="card-load-more__symbol">&raquo;</p>
                            </button>
                    </li>`
    return markup}

export {cardMoreLoad}