import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query: string) => {
    try {
        const response = await axios.get(`${BASE_URL}?q=${query}`);
        return response.data.items || [];
    } catch (error) {
        console.error('Error fetching data from Google Books API:', error);
        return [];
    }
};
