import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
import PixabayAPI from './fetchPhoto'

const searchingFormEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const endListText = document.querySelector('.endlist-text')

searchingFormEl.addEventListener('submit', onSearchFormSumit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

const pixabayAPI = new PixabayAPI();
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });

// const initialHeight = document.documentElement.scrollHeight;

async function onSearchFormSumit(e) {
    e.preventDefault();
    
    // baseParams.name = e.target.elements.searchQuery.value.trim();
    // console.log(baseParams.name);

    if (e.target.elements.searchQuery.value.trim() === "") {
        galleryListEl.innerHTML = "";
        return
    }
    pixabayAPI.setQuery(e.target.elements.searchQuery.value.trim())
    pixabayAPI.resetPage()
    galleryListEl.innerHTML = ('');
    endListText.classList.add('is-hidden')


    fetchPhotos()
}



async function onLoadMoreBtnClick() {
    await fetchPhotos()

    // galleryListEl.scrollTop += 80000
    const { height: cardHeight } = document
    .querySelector(".js-gallery")
    ?.firstElementChild?.getBoundingClientRect();
    

window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
});
    
    // const newHeight = document.documentElement.scrollHeight;
    // window.scrollTo(0, newHeight - initialHeight + cardHeight * 2);
    
    console.log(cardHeight * 2);
    console.log(document
    .querySelector(".js-gallery")
    .firstElementChild.getBoundingClientRect());

}

async function fetchPhotos() {
    try {
        const data = await pixabayAPI.fetchPhoto()
        
        if (data.total === 0) {
            galleryListEl.innerHTML = ''
            loadMoreBtnEl.classList.add('is-hidden')
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
            return
        } 
        if (pixabayAPI.getPage() === 1) {
            Notiflix.Notify.success(`We have found ${data.totalHits} photos for you`);
        }
            pixabayAPI.incrementPage()
            console.log(data);
            const html = onCreateGalleryList(data.hits)
        galleryListEl.insertAdjacentHTML('beforeend', html)
        loadMoreBtnEl.classList.remove('is-hidden')
        lightbox.refresh();

        const allPhotos = document.querySelectorAll('.gallery__image')
        if (data.totalHits === allPhotos.length || pixabayAPI.getPage() === 13) {
            loadMoreBtnEl.classList.add('is-hidden')
            endListText.classList.remove('is-hidden')
        }

    } catch (error) {
    console.log(error);
    }
}

function onCreateGalleryList(images) {
    return images.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => `<a href="${largeImageURL}" class="photo-card gallery__image" data-aos="fade-up"><img src="${webformatURL}" alt="${tags}" loading="lazy" clas="galery-image gallery__image" width="280"/><div class="info"><p class="info-item"><b>Likes</b>${likes}</p><p class="info-item"><b>Views</b>${views}</p><p class="info-item"><b>Comments</b>${comments}</p><p class="info-item"><b>Downloads</b>${downloads}</p></div></a>`).join("")
}