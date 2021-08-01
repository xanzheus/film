
 const makeMarkup = function (obj) {
     return  `<div class="modal">
     <button type="button" class="btn__close">
        <i class="material-icons"> close </i>
    </button>
    
    <div class="modal__box">
        <div class="modal__box-img">
            <img class="modal__poster" src="${obj.poster_path}" alt="${obj.title}">
        </div>
        <div class="description">
            <h2 class="description__title">${obj.title}</h2>
            <ul class="description__list list">
                <li class="description__item">
                    <p class="description__name">Vote / Votes</p>
                    <div class="description__votes--wrapper">
                        <div class="description__bg--accent">
                            <p class="description__vote">${obj.vote_average}</p>
                        </div>
                        <span class="description__divider">/</span>
                        <div class="description__votes--secondary">
                            <p class="description__votes">${obj.vote_count}</p>
                        </div>
                    </div>
                </li>
                <li class="description__item">
                    <p class="description__name">Popularity</p>
                    <p class="description__content">${obj.popularity}</p>
                </li>
                <li class="description__item">
                <div>
                <p class="description__name">Original Title</p>
                </div>
                    <p class="description__content">${obj.original_title} </p>
                </li>
                <li class="description__item">
                <div>
                <p class="description__name">Genre</p>
                </div>
                    
                    <p class="description__content">${obj.genres}</p>
                </li>    
            </ul>
                <h3 class="about__title">About</h3>
                    <p class="about__overview">${obj.overview}</p>

                     <ul class="buttons__list list">
            <li class="buttons__item">
                <button class="buttons__modal buttons__modal--accent" data-anchor="watched">
                    Add to watched
                </button>
            </li>        
            <li class="buttons__item">
                <button class="buttons__modal buttons__modal--secondary" data-anchor="queue">
                    Add to queue
                </button>
            </li>        
            <li class="buttons__item">
                <button class="buttons__modal buttons__modal--secondary" data-anchor="trailer">Trailer</button>
            </li>        
        </ul>
        </div>
    </div>
</div>`
}
    
export {makeMarkup}
    

