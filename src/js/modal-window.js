import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/src/styles/main.scss'
import refs from './refs';
import filmTpl from '../templates/modal-window'



export default function openModal(e) {
    // if (e.target.nodeName !== 'IMG') return
    // else if (e.code === 'Escape') return
    e.preventDefault()
    return basicLightbox.create(`{{#each this}}
 <div class="modal">
    <button type="button" class="modal__close">
        <svg class="modal__icon--close" >
            <use href="..src/images/sprite.svg#icon-close"></use>
        </svg>
    </button>

    <ul class="modal__box list">
        <li class="modal__box--item">
            <a href="${e.target.dataset.source}" href="src="/poster.c9693295.jpg">
            
                <img class="modal__poster" src="${e.target.dataset.source}"  data-source={{backdrop_path}}  alt="">
            </a>
            </li>
        <li class="modal__box--item">
        <div class="description">
        <h2 class="description__title">{{title}}</h2>
            <ul class="description__box list">
                <li class="description__list">
                    <p class="description__item">Vote / Votes</p>
                    <p class="description__item">Popularity</p>
                    <p class="description__item">Original Title</p>
                    <p class="description__item">Genre</p>
                </li>

                <li>
                    <p class="description__content">
                    <span class="description__vote">{{vote_average}}</span>
                    <span class="description__divider">/</span> <span class="description__votes">{{vote_count}}</span>
                     </p>
                    <p class="description__content">{{popularity}}</p>
                    <p class="description__content">{{original_title}} </p>
                    <p class="description__content"{{genre_ids}}</p>
                </li>
                
            </ul>

            <h3 class="about__title">About</h3>
            <p class="about__overview">{{overview}}</p>

             <ul class="nav__btn list">
        <li class="nav__btn--item">
            <button class="nav__btn--watched">
                add to Watched
            </button>
            </li>

            <li class="nav__btn--item">
            <button class="nav__btn--queue">
                add to queue
            </button> 
            </li>
    </ul>

        </li>
        </div>
            

    </ul>
    
</div>
{{/each}}
`).show()
}



refs.add_btn.addEventListener('click', openModal);



    
 

