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
