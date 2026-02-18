const animeDetails = document.querySelector("#anime-details");
export const renderAnimeDetails = (anime) => {
    animeDetails.classList.remove('hidden');
 
    animeDetails.innerHTML = '';
    animeDetails.removeAttribute('hidden');

    const h2 =document.createElement('h2');
    h2.textContent = anime.title;

    const img = document.createElement('img');
    img.src = anime.images.jpg.image_url;
    img.alt =anime.title;

    const animeSummery= document.createElement('p');
    animeSummery.textContent = anime.synopsis;

    const animeRating = document.createElement('p');
    animeRating.textContent =`Rating: ${anime.score}/10`;

    const genresList = document.createElement("ul");

    anime.genres.forEach((genre) => {
        const li = document.createElement("li");
        li.textContent = genre.name;
        genresList.appendChild(li);
    });

    animeDetails.append(h2,img,animeSummery,animeRating,genresList);
};