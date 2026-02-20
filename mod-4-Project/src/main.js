import { getAnimeByID, getAnime, getAnimeBySearch, getByGenre, getCharacterById } from './fetch-helper-functions'
import { renderAnimeDetails, renderAnime, renderCharacterDetails } from './dom-helper-functions'

const errorMessage = document.querySelector('#error-message');
const animeList = document.querySelector('#anime-list');
const searchForm = document.querySelector('#search-form');
const genresList = document.querySelector('#genres');
const animeDetails = document.querySelector('#anime-details');

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
    searchForm.reset();
  }
  catch (error) {
    errorMessage.textContent = error.message;
  }
});

animeDetails.addEventListener("click", async (e) => {
  const genreId = e.target.dataset.genreId;

  if (!genreId) return;

  const data = await getByGenre(genreId);

  if (!data) return;

  animeDetails.close();

  // Important: wrap to match your renderAnime format
  renderAnime({ data });
});

animeDetails.addEventListener('click', async (event) => {
  const characterId = event.target.closest('li').dataset.characterId;

  if (!characterId) return;

  renderCharacterDetails(await getCharacterById(characterId));
});