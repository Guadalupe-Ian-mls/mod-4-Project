import { getCharacters,getAnimeByID,getAnime} from "./fetch-helper-functions";

const animeDetails = document.querySelector("#anime-details");

export const renderAnimeDetails = async (anime) => {
    animeDetails.classList.remove('hidden');

    animeDetails.innerHTML = '';
    animeDetails.removeAttribute('hidden');

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
    const close = document.createElement('button')
    close.textContent = `close`

    //Character List
    const animeCast = document.createElement('ul');
    const characters = await getCharacters(anime.mal_id);

    for (let i = 0; i < 10; i++) {
        const character = characters.data[i];
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const name = document.createElement('p');
        const img = document.createElement('img');
        const role = document.createElement('p');

        h3.textContent = 'Characters:'
        name.textContent = character.character.name;
        img.src = character.character.images.jpg.image_url;
        img.alt = `Image of ${character.character.name}`;
        role.textContent = `Role: ${character.role}`;
        li.append(h3, name, img, role);
        animeCast.append(li);
    }



    animeDetails.append(h2, img, animeSummery, animeRating, genresList, animeCast);
    animeDetails.append(h2,img,animeSummery,animeRating,genresList,close);
};

const animeList = document.querySelector('#anime-list');
const animeCount = document.querySelector('#anime-count');

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
