import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export default class PixabayAPI {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    API_KEY = '34995018-f3e2a6c650b6c06aad8f250eb';

    async fetchPhoto() {
        try {
            const {data} = await axios.get(`?key=${this.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)

            return data;
    } catch (error) {
    console.log(error);
        }
    
    }

    incrementPage() {
        this.page += 1;
        }

    resetPage() {
        this.page = 1
    }
    setQuery(newQuery) {
        this.searchQuery = newQuery
    }
    getPage() {
        return this.page
    }
}