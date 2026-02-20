import { getAnimeByID, getAnime, getAnimeBySearch, getByGenre, getCharacterById } from './fetch-helper-functions'
import { renderAnimeDetails, renderAnime, renderCharacterDetails } from './dom-helper-functions'

const errorMessage = document.querySelector('#error-message');
const animeList = document.querySelector('#anime-list');
const searchForm = document.querySelector('#search-form');
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

    renderAnime({ data });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
});

animeDetails.addEventListener('submit', (e) => {
  if (e.target.id !== 'rating') return;

  e.preventDefault();

  const selectedRating = e.target.querySelector('input[name="rating"]:checked')?.value;

  if (!selectedRating) {
    errorMessage.textContent = 'Please select a rating.';
    setTimeout(() => errorMessage.textContent = '', 2000);
    return;
  }

  // Show thank you message
  const thankYou = document.createElement('p');
  thankYou.textContent = `⭐ Thank you for rating ${selectedRating} star(s)!`;

  e.target.replaceWith(thankYou);
});