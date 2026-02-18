import { getAnimeByID, getAnime, getAnimeBySearch } from './fetch-helper-functions'
import { renderAnimeDetails, renderAnime } from './dom-helper-functions'

const errorMessage = document.querySelector('#error-message');
const animeList = document.querySelector('#anime-list');
const searchForm = document.querySelector('#search-form');

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

searchForm.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const query = searchForm.elements.query.value;
    const searchedAnime = await getAnimeBySearch(query);

    renderAnime(searchedAnime);
    form.reset();
  }
  catch (error) {
    errorMessage.textContent = error.message;
  }
});