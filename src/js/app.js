import { getFetch } from './img-api';
import { createMarkup } from './markup';
import { refs } from './refs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.formEl.addEventListener('submit', handlerSubmit);

let queryValue;

async function handlerSubmit(e) {
  e.preventDefault();
  const inputValue = e.target.searchQuery.value;

  if (inputValue === '') {
    return;
  }

  try {
    const response = await getFetch(inputValue);
    if (response.data.hits.length === 0) {
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
    );
    refs.galleryEl.insertAdjacentHTML('beforeend', gallery);
    let lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
    });
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    refs.btnLoadMore.classList.remove('visually-hidden');
    queryValue = inputValue;
  } catch (error) {
    Notiflix.Notify.failure('ERROR!!! Something went wrong!!!');
  }
}

let page = 1;

refs.btnLoadMore.addEventListener('click', handlerLoadMore);

async function handlerLoadMore(e) {
  page += 1;
  const response = await getFetch(queryValue, page);
  const {data : {hits}} = response;
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
  )
  refs.galleryEl.insertAdjacentHTML('beforeend', gallery);
  
//  refresh(), який обов'язково потрібно викликати щоразу після додавання нової групи карток зображень


}
