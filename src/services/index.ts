import axios from "axios";

const API_KEY = import.meta.env.VITE_RIOTAPI_KEY;

type SummonerStats = {
  wins?: number;
  losses?: number;
  tier: string;
  rank: string;
  LP: number;
};

//League Calls

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

  const Stats: SummonerStats = {
    wins: response.data[0]?.wins,
    losses: response.data[0]?.losses,
    tier: response.data[0]?.tier,
    rank: response.data[0]?.rank,
    LP: response.data[0]?.leaguePoints,
  };
  return Stats;
};

// TFT Calls

export const getTFTRankedData = async (summonerId: number, region: string) => {
  const URL_TFT_RANKED_STATS = `https://${region}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${API_KEY}`;
  const response = await axios.get(URL_TFT_RANKED_STATS);

  const Stats: SummonerStats = {
    wins: response.data[0]?.wins,
    losses: response.data[0]?.losses,
    tier: response.data[0]?.tier,
    rank: response.data[0]?.rank,
    LP: response.data[0]?.leaguePoints,
  };
  return Stats;
};

export const getTFTChallengerLeaderboard = async (region: string) => {
  const URL_TFT_CHALLENGER_LEADERBOARD = `https://${region}.api.riotgames.com/tft/league/v1/challenger?api_key=${API_KEY}`;

  const response = await axios.get(URL_TFT_CHALLENGER_LEADERBOARD);
  return response.data.entries;
};

export const getMatchHistoryData = async (
  summonerName: string,
  region: string
) => {
  const data = await getSummonerData(summonerName, region);
  const puuid = data.puuid;
  const URL = `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`;
  const response = await axios.get(URL);
  return response.data;
};

export const getMatch = async (matchID: string, region: string) => {
  let RoutingRegion = "";

  switch (region) {
    case "eun1":
    case "euw1":
    case "tr1":
    case "ru":
      RoutingRegion = "europe";
      break;
    case "kr":
    case "jp1":
      RoutingRegion = "asia";
      break;
    case "na1":
    case "la1":
    case "la2":
    case "br1":
    case "oc1":
      RoutingRegion = "americas";
      break;
    default:
      break;
  }

  const URL = `https://${RoutingRegion}.api.riotgames.com/tft/match/v1/matches/${matchID}?api_key=${API_KEY}`;
  const response = await axios.get(URL);
  return response.data;
};
