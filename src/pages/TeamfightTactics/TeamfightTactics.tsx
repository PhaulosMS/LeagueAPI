import { useState, useEffect } from "react";
import SummonerSearch from "../../components/SummonerSearch/SummonerSearch";
import { getSummonerData, getTFTRankedData } from "../../services";
import { SummonerForm } from "../../types/summonerDataTypes";
import PlayerRank from "../../components/PlayerRank/PlayerRank";
import MatchHistory from "../../components/MatchHistory/MatchHistory";

// can also maybe make this global type

const SummonerFormData: SummonerForm = {
  summonerData: undefined,
  summonerName: "",
  region: "euw1",
  tier: "",
  rank: "",
  LP: 0,
  summonerWins: undefined,
  summonerLosses: undefined,
};

const TeamfightTactics = () => {
  const [summonerState, setSummonerState] = useState(SummonerFormData);
  const [error, setError] = useState<boolean>(false);
  const {
    summonerData,
    summonerName,
    region,
    tier,
    rank,
    LP,
    summonerWins,
    summonerLosses,
  } = summonerState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await getSummonerData(summonerName, region);
    response === null ? setError(true) : setError(false);
    setSummonerState((prevState) => ({
      ...prevState,
      summonerData: response,
      summonerWins: undefined,
      summonerLosses: undefined,
    }));
  };

  const handleFormData = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setSummonerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getTFTRankedStats = async () => {
    if (summonerData?.id) {
      const response = await getTFTRankedData(summonerData.id, region);
      setSummonerState((prevState) => ({
        ...prevState,
        tier: response.tier,
        rank: response.rank,
        LP: response.LP,
        summonerWins: response.wins,
        summonerLosses: response.losses,
      }));
    }
  };

  useEffect(() => {
    getTFTRankedStats();
  }, [summonerData]);

  return (
    <div className="flex flex-col items-center mt-3">
      <SummonerSearch
        handleSubmit={handleSubmit}
        handleFormData={handleFormData}
        summonerName={summonerName}
      />
      {error ? (
        <h1 className="text-red-600 mt-6">Summoner not found</h1>
      ) : (
        summonerData && (
          <div className="flex flex-col items-center mt-8">
            <h1 className="mb-3 font-bold text-lg">{summonerData.name}</h1>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${summonerData.profileIconId}.png`}
              alt=""
            />
          </div>
        )
      )}
      <div>
        {summonerData && summonerWins != 0 && summonerLosses != 0 && (
          <PlayerRank
            tier={tier}
            rank={rank}
            wins={summonerWins}
            losses={summonerLosses}
            LP={LP}
          />
        )}
      </div>
      {summonerData && (
        <MatchHistory summonerName={summonerData.name} region={region} puuid={summonerData.puuid} />
      )}
    </div>
  );
};

export default TeamfightTactics;
