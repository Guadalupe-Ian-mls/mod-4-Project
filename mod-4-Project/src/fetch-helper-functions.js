export const getAnimeByID =async(id)=>{
    try{
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