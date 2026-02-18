import { getAnime } from './fetch-helper-functions';
import { renderAnime } from './dom-helper-functions';

const errorMessage = document.querySelector('#error-message');
const anime = await getAnime();

if (anime.error) {
  errorMessage.textContent = anime.error.message;
} else {
  renderAnime(anime);
}