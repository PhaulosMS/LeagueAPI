import axios from "axios";

const API_KEY = import.meta.env.VITE_RIOTAPI_KEY;

export const getSummonerData = async (summonerName: string, region: string) => {
  const URL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getRankedData = async (summonerId: number, region: string) => {
  const URL_RANKED_WINS = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`;

  const response = await axios.get(URL_RANKED_WINS);
  const wins = response.data[0]?.wins ?? undefined;
  const losses = response.data[0]?.losses ?? undefined;

  return { wins, losses };
};
