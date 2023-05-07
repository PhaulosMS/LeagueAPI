export type SummonerData = {
  name: string;
  id: number;
  puuid: string;
  summonerLevel: number;
  profileIconId: number;
};

export type SummonerForm = {
  summonerData?: SummonerData;
  summonerName: string;
  region: string;
  tier: string;
  rank: string;
  LP: number;
  summonerWins?: number;
  summonerLosses?: number;
};
