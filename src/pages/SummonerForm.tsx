import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import getSummonerData from "../services/index";

type SummonerData = {
  name: string;
  id: number;
  summonerLevel: number;
  profileIconId: number;
};

const SummonerForm = () => {
  // Make an Object instead  of a usestate for each.
  const [summonerData, setSummonerData] = useState<SummonerData | undefined>();
  const [summonerName, setSummonerName] = useState<string>("");
  const [region, setRegion] = useState("euw1"); // TODO: Setup form to select region. Default EUW for simplicity sake
  const [summonerWins, setSummonerWins] = useState<number | undefined>();
  const [summonerLosses, setSummonerLosses] = useState<number | undefined>();

  const URL_RANKED_WINS = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${
    summonerData?.id
  }?api_key=${import.meta.env.VITE_RIOTAPI_KEY}`;

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await getSummonerData(summonerName, region);
    setSummonerData(response);
  };
  const handleSummonerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.target.value);
  };

  const handleRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  const getRankedStats = () => {
    if (summonerData?.id) {
      axios.get(URL_RANKED_WINS).then((response) => {
        const wins = response.data[0]?.wins ?? undefined;
        const losses = response.data[0]?.losses ?? undefined;
        setSummonerWins(wins);
        setSummonerLosses(losses);
      });
    }
  };

  const handleWinPercentage = () => {
    if (summonerWins != undefined && summonerLosses != undefined) {
      const games = summonerWins + summonerLosses;
      const winPercentage = games ? Math.ceil((summonerWins / games) * 100) : 0;
      return <>{winPercentage}%</>;
    }
  };

  useEffect(() => {
    getRankedStats();
    console.log("fetched");
  }, [summonerData]);

  return (
    <div>
      <Link to="/">Home</Link>
      <form onSubmit={(e) => handleSumbit(e)}>
        <label htmlFor="SummonerName">Summoner Name</label>
        <input
          type="text"
          name="SummonerName"
          placeholder="Summoner Name"
          value={summonerName}
          onChange={(e) => handleSummonerName(e)}
        />
        <button>Submit</button>
        <select name="region" id="region" onChange={(e) => handleRegion(e)}>
          <option value="euw1">EUW</option>
          <option value="na1">NA</option>
        </select>
      </form>

      {summonerData && (
        <>
          <h1>
            {summonerData.name} - {summonerData.summonerLevel}
          </h1>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${summonerData.profileIconId}.png`}
            alt=""
          />
        </>
      )}

      {summonerWins != null && summonerLosses != null && (
        <h1>
          {summonerWins} - {summonerLosses} - {handleWinPercentage()}
        </h1>
      )}
    </div>
  );
};

export default SummonerForm;
