import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
// import PixabayAPI from './pixabay-servise';
import { fetchPhoto } from './fetchPhoto';

const searchingFormEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

searchingFormEl.addEventListener('submit', onSearchFormSumit);
// galleryListEl.addEventListener('click', onGalleryItemClick)

// const pixabayAPI = new PixabayAPI();

// const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 200, });

let baseParams = {
    page: 1,
    name:''
}


let pagesAmount = 0;


async function onSearchFormSumit(e) {
    e.preventDefault();
    
    baseParams.name = e.target.elements.searchQuery.value.trim();
    console.log(baseParams.name);

    if (baseParams.name === "") {
        galleryListEl.innerHTML = "";
        return
    }

    // const { data: { hits, totalHits } } = await fetchPhoto(params);
    // pagesAmount = totalHits;
    // Notiflix.Notify.success(`We have found ${pagesAmount} photos for you`);

    // if (hits.length === 0) {
    //     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
    // }
    // else {


        fetchPhoto(baseParams.name)
            .then(({ data }) => {
                console.log(data.hits);
                galleryListEl.innerHTML = onCreateGalleryList(data.hits);
                // galleryListEl.insertAdjacentHTML("beforeend", onCreateGalleryList(data.hits))
            })
            .catch((error) => {
                console.log(error);
            })
    
    }

// }
function onCreateGalleryList(images) {
    return images.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => `<a href="${largeImageURL}" class="photo-card gallery__image" data-aos="fade-up"><img src="${webformatURL}" alt="${tags}" loading="lazy" clas="galery-image gallery__image" width="280"/><div class="info"><p class="info-item"><b>Likes</b>${likes}</p><p class="info-item"><b>Views</b>${views}</p><p class="info-item"><b>Comments</b>${comments}</p><p class="info-item"><b>Downloads</b>${downloads}</p></div></a>`)
}

loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
    // pixabayAPI.page = pagesAmount.value
    // pagesAmount += baseParams.page

    
    // if (pagesAmount <= 0) {
    //     loadMoreBtnEl.classList.add('is-hidden')
    // }

}
