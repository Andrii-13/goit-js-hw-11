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

let queryValue;
let inputValue;
let totalNumberOfPges = 40;
let page;

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
      // lightScroll();
      refs.btnLoadMore.classList.add('visually-hidden');
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
    refs.galleryEl.innerHTML = gallery.join('');
    page = 1;
    lightbox.refresh();
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.totalHits} images.`
    );
    // lightScroll();
    refs.btnLoadMore.classList.remove('visually-hidden');
    if (response.data.totalHits <= totalNumberOfPges) {
      refs.btnLoadMore.classList.add('visually-hidden');
    }
    queryValue = inputValue;
  } catch (error) {
    Notiflix.Notify.failure('ERROR!!! Something went wrong!!!');
  }
}

refs.btnLoadMore.addEventListener('click', handlerLoadMore);

async function handlerLoadMore(e) {
  page += 1;

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
    );
    refs.galleryEl.insertAdjacentHTML('beforeend', gallery.join(''));
    lightbox.refresh();

    if (
      response.config.params.page >=
      response.data.totalHits / response.config.params.per_page
    ) {
      refs.btnLoadMore.classList.add('visually-hidden');
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


// function lightScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 5,
//     behavior: 'smooth',
//   });
// }