import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  appendToGallery,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  getCardHeight,
  smoothScrollBy,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

// Ensure load more button is hidden on page load
hideLoadMoreBtn(loadMoreBtn);

function showLoader() {
  loader.innerHTML =
    '<span class="lds-ring"><span></span><span></span><span></span><span></span></span>';
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
  loader.innerHTML = '';
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

function showInfo(message) {
  iziToast.info({
    title: 'Info',
    message: message,
    position: 'topRight',
  });
}

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const query = formData.get('searchQuery').trim();

  if (!query) {
    showError('Please enter a search query!');
    return;
  }

  // Reset for new search
  currentQuery = query;
  currentPage = 1;
  clearGallery(gallery);
  hideLoadMoreBtn(loadMoreBtn);
  showLoader();

  try {
    const data = await fetchImages(query, currentPage);
    hideLoader();
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showInfo(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    const markup = renderGallery(data.hits);
    appendToGallery(gallery, markup);
    lightbox.refresh();

    // Show total results info
    showInfo(`Hooray! We found ${totalHits} images.`);

    // Show load more button only if there are more results to load after images are rendered
    setTimeout(() => {
      if (
        data.hits.length > 0 &&
        totalHits > 15 &&
        currentPage * 15 < totalHits
      ) {
        showLoadMoreBtn(loadMoreBtn);
      }
    }, 100);
  } catch (error) {
    hideLoader();
    showError('Something went wrong. Please try again!');
    console.error('Error:', error);
  }
}

async function onLoadMoreClick() {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    hideLoader();

    const markup = renderGallery(data.hits);
    appendToGallery(gallery, markup);
    lightbox.refresh();

    // Smooth scroll
    const cardHeight = getCardHeight(gallery);
    smoothScrollBy(cardHeight);

    // Check if we've reached the end
    if (currentPage * 15 >= totalHits) {
      hideLoadMoreBtn(loadMoreBtn);
      showInfo("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    hideLoader();
    showError('Something went wrong. Please try again!');
    console.error('Error:', error);
  }
}
