 const makeMarkup = function (obj) {
     return  `<div class="modal">
     <button type="button"  class="btn__close">
        <svg class="btn__icon">
            <use href="./images/sprite.svg#icon-close"></use>
        </svg>
    </button>
    
    <div class="modal__box">
        <div class="modal__wrapper">
            <img class="modal__poster" src="${obj.poster_path}" alt="${obj.title}">
        </div>

        <div class="modal__box-info">
            <div class="description">
                <h2 class="description__title">${obj.title}</h2>
                <ul class="description__list list">
                    <li class="description__item">
                        <p class="description__name">Vote / Votes</p>
                        <div  class="description__votes--wrapper" >
                            <p class="description__vote">${obj.vote_average}</p>
                        
                        <span class="description__divider">/</span>
                            <p class="description__votes">${obj.vote_count}</p>
                        </div>
                    </li>
                    <li class="description__item">
                        <p class="description__name">Popularity</p>
                        <p class="description__content">${obj.popularity}</p>
                    </li>
                    <li class="description__item">
                        <p class="description__name">Original Title</p>
                        <p class="description__content">${obj.original_title} </p>
                    </li>
                    <li class="description__item">
                        <p class="description__name">Genre</p>
                        <p class="description__genre"></p>${obj.genres} </p>
                    </li>
        
                </ul>
                 <h3 class="about__title">About</h3>
                        <p class="about__overview">${obj.overview}</p>
            </div>
            <ul class="button__list list">
                <li class="button__item">
                    <button class="button__watched watched">
                        Add to Watched
                    </button>
                </li>
            
                <li class="button__item">
                    <button class="button__queue queue">
                        Add to queue
                    </button>
                </li>
            
                <li class="button__item">
                    <button class="button__trailer">Trailer</button>
                </li>
            
            </ul>
    </div>
</div>

</div>`
}
    
export {makeMarkup}
    
