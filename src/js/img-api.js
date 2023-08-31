import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39176406-c12c047aa6bfb11d5ee548958';

export function getImg(name) {
  const response = axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: name,
      per_page: 10,
      page: 1,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response;
}
