import { getAnimeByID, getAnime } from './fetch-helper-functions'
import { renderAnimeDetails, renderAnime } from './dom-helper-functions'

const errorMessage = document.querySelector('#error-message');
const animeList = document.querySelector('#anime-list');

animeList.addEventListener('click', async (event) => {
  const li = event.target.closest('li');
  if (!li) return;
  const anime = await getAnimeByID(li.dataset.animeId);

  if (!anime) {
    errorMessage.textContent = 'Failed to load anime details.';
    setTimeout(() => errorMessage.textContent = '', 2000);
    return;
  }

  renderAnimeDetails(anime);
})

const anime = await getAnime();

if (anime.error) {
  errorMessage.textContent = anime.error.message;
} else {
  renderAnime(anime);
}
