import { getCharacters, getAnimeByID, getAnime, getByGenre } from "./fetch-helper-functions";

const animeDetails = document.querySelector("#anime-details");
const animeList = document.querySelector('#anime-list');
const animeCount = document.querySelector('#anime-count');

export const renderAnimeDetails = async (anime) => {

    animeDetails.innerHTML = '';
    animeDetails.showModal();

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
    genresList.className = 'genre-list';
    anime.genres.forEach((genre) => {
        const li = document.createElement("li");
        li.textContent = genre.name;
        li.dataset.genreId = genre.mal_id;
        genresList.appendChild(li);
    });

    const h3 = document.createElement('h3');
    h3.textContent = 'Characters:';

    const close = document.createElement('button')
    close.textContent = `close`
    close.classList.add('close');
    close.addEventListener('click', () => {
        animeDetails.close();
    });
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
        li.dataset.characterId = character.character.mal_id;
        animeCast.append(li);
    }
    animeCast.className = 'anime-characters';

    const ratingWrapper = document.createElement('div');
    ratingWrapper.classList.add('rating-wrapper');

    const form = document.createElement('form');
    form.id = 'rating';

    for (let i = 5; i >= 1; i--) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `star${i}`;
        input.name = 'rating';
        input.value = i;

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.title = `${i} star${i > 1 ? 's' : ''}`;
        label.textContent = '☆';

        form.append(input, label);
    }

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Submit Rating';
    button.classList.add('submit-btn');

    form.append(button);

    ratingWrapper.append(form);

    animeDetails.append(h2,img,animeSummery,animeRating,genresList,h3,animeCast,ratingWrapper,close);
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
animeDetails.addEventListener('click', (e) => {
    if (e.target === animeDetails) {
        animeDetails.close();
    }
});

export const renderCharacterDetails = (character) => {
    animeDetails.innerHTML = '';
    animeDetails.showModal();

    const name = document.createElement('h3');
    const img = document.createElement('img');
    const aboutSection = document.createElement('h4');
    const about = document.createElement('p');

    name.textContent = character.data.name;
    img.src = character.data.images.jpg.image_url;
    img.alt = `Image of ${character.data.name}`;
    aboutSection.textContent = 'About';
    about.textContent = character.data.about;

    animeDetails.append(name, img, aboutSection, about);
}