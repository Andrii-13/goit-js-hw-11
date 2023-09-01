export function createMarkup(urlImg, largeImg, alt, likes, wiews, comments, downloads) {
    return `
    <div class="photo-card">
    <div class="thumb">
        <a class="gallery__link" href="${largeImg}">
            <img src="${urlImg}" alt="${alt}" loading="lazy" class='gallery__image' />
        </a>
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${wiews}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`
}