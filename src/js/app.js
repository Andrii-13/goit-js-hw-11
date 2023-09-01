import { getImg } from './img-api';
import { createMarkup } from './markup';
import { refs } from './refs';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

refs.formEl.addEventListener('submit', getGallery);

function getGallery(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget.elements;
  getImg(searchQuery.value).then(response => {
    if (response.data.hits.length === 0){      
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
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
    refs.collectionEl.innerHTML = gridImg; 
    refs.btnLoadMore.classList.remove('visually-hidden');
    let lightbox = new SimpleLightbox('.gallery a', {  
      captionDelay: 250, 
    })
  });
 
}

