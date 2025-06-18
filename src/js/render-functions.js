export function renderGallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
        />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
      </a>
    </li>
  `
    )
    .join('');
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function appendToGallery(gallery, markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function showLoadMoreBtn(btn) {
  btn.classList.remove('hidden');
}

export function hideLoadMoreBtn(btn) {
  btn.classList.add('hidden');
}

export function getCardHeight(gallery) {
  const card = gallery.querySelector('.gallery-item');
  if (card) {
    return card.getBoundingClientRect().height;
  }
  return 0;
}

export function smoothScrollBy(height) {
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
