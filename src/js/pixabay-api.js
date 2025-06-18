import axios from 'axios';

const API_KEY = '50806139-f783558adc167f8e9c7c3d5e1';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error(
      `HTTP error! status: ${error.response?.status || error.message}`
    );
  }
}
