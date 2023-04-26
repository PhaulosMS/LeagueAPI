import axios from "axios";

const API_KEY = import.meta.env.VITE_RIOTAPI_KEY;

const getSummonerData = async (summonerName: string, region: string) => {
  const URL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getSummonerData;
