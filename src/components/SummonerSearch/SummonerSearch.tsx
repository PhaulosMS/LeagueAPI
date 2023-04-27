import React from "react";
import "./styles.css";

type SummonerFormData = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  summonerName: string;
  handleFormData: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const SummonerSearch = ({
  handleSubmit,
  summonerName,
  handleFormData,
}: SummonerFormData) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="summonerName">Summoner Name</label>
      <input
        type="text"
        name="summonerName"
        placeholder="Summoner Name"
        value={summonerName}
        onChange={(e) => handleFormData(e)}
      />
      <label htmlFor="region">Region</label>
      <select name="region" id="region" onChange={(e) => handleFormData(e)}>
        <option value="euw1">EUW</option>
        <option value="na1">NA</option>
      </select>
      <button>Submit</button>
    </form>
  );
};

export default SummonerSearch;
