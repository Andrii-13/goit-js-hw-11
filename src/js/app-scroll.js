import { getFetch } from './img-api';
import { createMarkup } from './markup';
import { refs } from './refs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.formEl.addEventListener('submit', handlerSubmit);

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

let option = {
    rootMargin: '300px',
  };
  
const observer = new IntersectionObserver(handlerLoadMore, option);
let queryValue;
let inputValue;
let totalNumberOfPges = 20;

async function handlerSubmit(e) {
  window.scrollTo(0, 0);
  e.preventDefault();
  inputValue = e.target.searchQuery.value;

  if (inputValue === '' || inputValue.trim() === '') {
    refs.galleryEl.innerHTML = '';
    Notiflix.Notify.info('Your query is empty. Please try again');
    return;
  }

  try {
    const response = await getFetch(inputValue, totalNumberOfPges);
    if (response.data.hits.length === 0) {
      refs.galleryEl.innerHTML = '';

      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const {
      data: { hits },
    } = response;
    const gallery = hits.map(
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
    ).join('');
    refs.galleryEl.innerHTML = gallery;
    page = 1;
    lightbox.refresh();
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    if (response.data.totalHits >= totalNumberOfPges) {
        observer.observe(refs.guard);
      }
      queryValue = inputValue;
    } catch (error) {
        console.log(error);
    Notiflix.Notify.failure('ERROR!!! Something went wrong!!!');
  }

 
  
  
  // console.log(refs.guard);
  
 
}

function handlerLoadMore(entries){
    entries.forEach(async entry=>{
    //   console.log(entry);
    //   console.log(page);
    //   console.log(totalNumberOfPges);
    //   console.log(queryValue);
if (entry.isIntersecting){
  page +=1
  try {
    const response = await getFetch(queryValue, totalNumberOfPges, page);
    const {
      data: { hits },
    } = response;
    const gallery = hits.map(
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
    ).join('');
    refs.galleryEl.insertAdjacentHTML('beforeend', gallery);
    lightbox.refresh();

    if (response.config.params.page >=
        response.data.totalHits / response.config.params.per_page) {
      observer.unobserve(refs.guard);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    refs.btnLoadMore.classList.add('visually-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
    });
}