import axios from "axios";

export async function fetchPhoto() {
    const IMG_URL = 'https://pixabay.com/api/?key=34995018-f3e2a6c650b6c06aad8f250eb&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}'

    try {
        const respons = await axios.get(IMG_URL)

        return respons
    } catch (error) {
    console.log(error);
    }
}

