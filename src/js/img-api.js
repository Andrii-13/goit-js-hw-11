import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39176406-c12c047aa6bfb11d5ee548958';

export async function getImg(name) {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: name,
      per_page: 40,
      page: 1,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  }).catch(function (error) {
    Notiflix.Notify.failure('ERROR!!! Something went wrong!!!');
    if (error.response) {
      // Запит було зроблено, і сервер відповів кодом стану, який 
      // виходить за межі 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // Запит було зроблено, але відповіді не отримано 
      // `error.request` - це екземпляр XMLHttpRequest у браузері та екземпляр 
      // http.ClientRequest у node.js
      console.log(error.request);
    } else {
      // Щось сталося під час налаштування запиту, що викликало помилку
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  return response;
}
