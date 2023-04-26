import React, { useState, useEffect } from "react";
import { getRankedData, getSummonerData } from "../services/index";

type SummonerData = {
  name: string;
  id: number;
  summonerLevel: number;
  profileIconId: number;
};

type SummonerForm = {
  summonerData?: SummonerData;
  summonerName: string;
  region: string;
  summonerWins?: number;
  summonerLosses?: number;
};

const SummonerFormData: SummonerForm = {
  summonerData: undefined,
  summonerName: "",
  region: "euw1",
  summonerWins: undefined,
  summonerLosses: undefined,
};

const SummonerForm = () => {
  const [summonerState, setSummonerState] = useState(SummonerFormData);
  const [error, setError] = useState<boolean>(false);
  const { summonerData, summonerName, region, summonerWins, summonerLosses } =
    summonerState;

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        summonerWins: response.wins,
        summonerLosses: response.losses,
      }));
    }
  };

  const handleWinPercentage = () => {
    if (summonerWins != undefined && summonerLosses != undefined) {
      const games = summonerWins + summonerLosses;
      const winPercentage = games ? Math.ceil((summonerWins / games) * 100) : 0;
      return <>{winPercentage}%</>;
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
    console.log("fetched");
  }, [summonerData]);

  return (
    <div>
      <form onSubmit={(e) => handleSumbit(e)}>
        <label htmlFor="SummonerName">Summoner Name</label>
        <input
          type="text"
          name="summonerName"
          placeholder="Summoner Name"
          value={summonerName}
          onChange={(e) => handleFormData(e)}
        />
        <button>Submit</button>
        <select name="region" id="region" onChange={(e) => handleFormData(e)}>
          <option value="euw1">EUW</option>
          <option value="na1">NA</option>
        </select>
      </form>

      {error ? (
        <h1 style={{ color: "Red" }}>Summoner not found</h1>
      ) : (
        summonerData && (
          <div>
            <h1>
              Summoner Name: {summonerData.name}
              Level: {summonerData.summonerLevel}
            </h1>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${summonerData.profileIconId}.png`}
              alt=""
            />
            {summonerWins != null && summonerLosses != null && (
              <h1>
                {summonerWins} - {summonerLosses} - {handleWinPercentage()}
              </h1>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SummonerForm;
