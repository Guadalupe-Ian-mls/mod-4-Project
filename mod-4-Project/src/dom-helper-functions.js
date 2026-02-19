import { getCharacters, getAnimeByID, getAnime } from "./fetch-helper-functions";

const animeDetails = document.querySelector("#anime-details");
const animeList = document.querySelector('#anime-list');
const animeCount = document.querySelector('#anime-count');

export const renderAnimeDetails = async (anime) => {
    animeDetails.classList.remove('hidden');

    animeDetails.innerHTML = '';
    animeDetails.removeAttribute('hidden');

    //Renders main details onto description 
    const h2 = document.createElement('h2');
    h2.textContent = anime.title;

    const img = document.createElement('img');
    img.src = anime.images.jpg.image_url;
    img.alt = anime.title;

    const animeSummery = document.createElement('p');
    animeSummery.textContent = anime.synopsis;

    const animeRating = document.createElement('p');
    animeRating.textContent = `Rating: ${anime.score}/10`;

    const genresList = document.createElement("ul");

    anime.genres.forEach((genre) => {
        const li = document.createElement("li");
        li.textContent = genre.name;
        genresList.appendChild(li);
    });

    const h3 = document.createElement('h3');
    h3.textContent = 'Characters:';

    const close = document.createElement('button')
    close.textContent = `close`

    //Renders the character list
    const animeCast = document.createElement('ul');
    const characters = await getCharacters(anime.mal_id);

    for (let i = 0; i < 10; i++) {
        const character = characters.data[i];
        const li = document.createElement('li');
        const name = document.createElement('p');
        const img = document.createElement('img');
        const role = document.createElement('p');

        name.textContent = character.character.name;
        img.src = character.character.images.jpg.image_url;
        img.alt = `Image of ${character.character.name}`;
        img.style.width = '50px';
        role.textContent = `Role: ${character.role}`;
        li.append(name, img, role);
        li.className = 'character';
        animeCast.append(li);
    }
    animeCast.className = 'anime-characters';

    animeDetails.append(h2, img, animeSummery, animeRating, genresList, h3, animeCast, close);
};

export const renderAnime = (anime) => {
    animeList.innerHTML = '';
    animeCount.textContent = anime.data.length;

    anime.data.forEach((anime) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const title = document.createElement('h3');

        li.dataset.animeId = anime.mal_id;
        img.src = anime.images.jpg.image_url;
        img.alt = `Image of ${anime.title}`;
        title.textContent = anime.title;

        li.append(img, title);

        animeList.append(li);
    });
};
