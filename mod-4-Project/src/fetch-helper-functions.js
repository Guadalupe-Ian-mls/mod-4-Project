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
        console.log(`Error: ${error.message}`);
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