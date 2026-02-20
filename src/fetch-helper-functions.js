export const getAnimeByID = async (id) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        if (!response.ok) {
            throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }
        const responseData = await response.json();
        return responseData.data;

    }
    catch (error) {
        console.warn(`Error: ${error.message}`);
        return null;
    }
}

export const getAnime = async () => {
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?type=tv');

        if (!response.ok) {
            throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const anime = data.data;
        return { data: anime, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
}

export const getAnimeBySearch = async (query) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw=true`);

        if (!response.ok) {
            throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const anime = data.data;
        return { data: anime, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
}

export const getCharacters = async (animeId) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);

        if (!response.ok) {
            throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const characters = data.data;
        return { data: characters, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
}

export const getByGenre = async (id) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${id}`);
        if (!response.ok) {
            throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }
        const responseData = await response.json();
        return responseData.data;
    }
    catch (error) {
        console.warn(`Error: ${error.message}`);
        return null;
    }
}
export const getCharacterById = async (id) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/characters/${id}`);

        if (!response.ok) {
            throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const character = data.data;
        return { data: character, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
}