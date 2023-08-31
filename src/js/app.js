import { getImg } from './img-api';
import { createMarkup } from './markup';
import { refs } from './refs';

refs.formEl.addEventListener('submit', getListImages);

function getListImages(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget.elements;
  getImg(searchQuery.value).then(response => {
    const gridImg = response.data.hits
      .map(({ webformatURL }) => createMarkup(webformatURL))
      .join('');
    refs.collectionEl.innerHTML = gridImg;
  });
}
