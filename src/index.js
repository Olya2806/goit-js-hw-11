import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
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

// let baseName = "";
let pagesAmount = 0;


async function onSearchFormSumit(e) {
    e.preventDefault();
    
    baseParams.name = e.target.elements.searchQuery.value.trim();
    console.log(baseParams.name);

    if (baseParams.name = "") {
        galleryListEl.innerHTML = "";
        return
    }


    fetchPhoto(baseParams.name)
        .then((data) => {
            console.log(data);
            galleryListEl.insertAdjacentHTML(onCreateGalleryList(data))
        }) 
        .catch((error) => {
            console.error(error);
        })
    

}
function onCreateGalleryList(image) {
    return image.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => '<a href="${image.largeImageURL}" class="photo-card gallery__image" data-aos="fade-up"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" clas="galery-image gallery__image" width="280"/><div class="info"><p class="info-item"><b>Likes</b>${image.likes}</p><p class="info-item"><b>Views</b>${image.views}</p><p class="info-item"><b>Comments</b>${image.comments}</p><p class="info-item"><b>Downloads</b>${image.downloads}</p></div></a>')
}
    
