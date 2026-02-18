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
