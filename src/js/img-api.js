import axios from 'axios';


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39176406-c12c047aa6bfb11d5ee548958';

export async function getFetch(name, totalNumberOfPges, currentPage = 1 ) {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: name,
      per_page: totalNumberOfPges,
      page: currentPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response;
};
