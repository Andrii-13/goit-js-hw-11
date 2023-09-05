import { getImg } from './img-api';
import { createMarkup } from './markup';
import { refs } from './refs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.formEl.addEventListener('submit', getGallery);

let queryValue;

function getGallery(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget.elements;
  if (searchQuery.value === ''){
    return;
  }
  getImg(searchQuery.value)  
    .then(response => {
      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
      const gridImg = response.data.hits
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) =>
            createMarkup(
              webformatURL,
              largeImageURL,
              tags,
              likes,
              views,
              comments,
              downloads
            )
        )
        .join('');
      refs.collectionEl.insertAdjacentHTML('beforeEnd', gridImg);
      refs.btnLoadMore.classList.remove('visually-hidden');
      let lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
      });
    })
    .catch(function (error) {
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
     queryValue = searchQuery.value;
     console.log(queryValue);
    return queryValue;
};


 let page = 1;
 refs.btnLoadMore.addEventListener('click', addNextCards);

function addNextCards(e,queryValue) {
  console.log(queryValue);
   page += 1;
   getImg(queryValue, page)
     .then(response => {
       const gridImg = response.data.hits
         .map(
           ({
             webformatURL,
             largeImageURL,
             tags,
             likes,
             views,
             comments,
             downloads,
           }) =>
             createMarkup(
               webformatURL,
               largeImageURL,
               tags,
               likes,
               views,
               comments,
               downloads
             )
         )
         .join('');
       refs.collectionEl.insertAdjacentHTML('beforeEnd', gridImg);
       // console.log(response.config.params.page);
       // console.log(response.data.totalHits);
       // console.log(response.config.params.per_page);
       if (
         response.config.params.page <=
         response.data.totalHits / response.config.params.per_page
       ) {
         
         refs.btnLoadMore.classList.remove('visually-hidden');     // не показує кнопку більше ніж сторінок
         let lightbox = new SimpleLightbox('.gallery a', {
           captionDelay: 250,
         });          
       }else {
       refs.btnLoadMore.classList.add('visually-hidden');
       Notiflix.Notify.info(
         "We're sorry, but you've reached the end of search results."); 
     }})
     .catch(function (error) {
       Notiflix.Notify.info(
         "We're sorry, but you've reached the end of search results."
       );        
     });
 };