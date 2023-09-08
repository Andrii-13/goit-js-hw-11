export function createMarkup(hits) {
    return hits.map(({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `
    <div class="photo-card">
    <div class="thumb">
        <a class="gallery__link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class='gallery__image' />
        </a>
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`).join('');
}