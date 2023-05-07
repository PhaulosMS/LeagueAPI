import React, { useState, useEffect } from "react";
import { getRankedData, getSummonerData } from "../../services/index";
import SummonerSearch from "../../components/SummonerSearch/SummonerSearch";
import { SummonerForm } from "../../types/summonerDataTypes";

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

const SummonerForm = () => {
  const [summonerState, setSummonerState] = useState(SummonerFormData);
  const [error, setError] = useState<boolean>(false);
  const { summonerData, summonerName, region, summonerWins, summonerLosses } =
    summonerState;

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

  const getRankedStats = async () => {
    if (summonerData?.id) {
      const response = await getRankedData(summonerData.id, region);
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

  const handleWinPercentage = () => {
    if (summonerWins != undefined && summonerLosses != undefined) {
      const games = summonerWins + summonerLosses;
      const winPercentage = games ? Math.ceil((summonerWins / games) * 100) : 0;
      return winPercentage;
    }
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

  useEffect(() => {
    getRankedStats();
  }, [summonerData]);

  return (
    <div className="container">
      <SummonerSearch
        handleSubmit={handleSubmit}
        handleFormData={handleFormData}
        summonerName={summonerName}
      />

      {error ? (
        <h1 className="error-message">Summoner not found</h1>
      ) : (
        summonerData && (
          <div>
            <h1 className="summoner-info">{summonerData.name}</h1>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/${summonerData.profileIconId}.png`}
              alt=""
            />
          </div>
        )
      )}
    </div>
  );
};

export default SummonerForm;
