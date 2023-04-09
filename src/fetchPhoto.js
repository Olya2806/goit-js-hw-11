import axios from 'axios';
export default class PixabayAPI {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    API_KEY = '34995018-f3e2a6c650b6c06aad8f250eb';
    BASE_URL = 'https://pixabay.com/api/';

    async fetchPhoto() {
        try {
            const IMG_URL = await axios.get(`${this.BASE_URL}?key=${this.API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)

            return IMG_URL;
    } catch (error) {
    console.log(error);
    }



    }
}