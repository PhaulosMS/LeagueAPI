import React from "react";
import "./styles.css";

const regions = {
  EUW: "euw1",
  NA: "na1",
  EUNE: "eun1",
  BR: "br1",
  JP: "jp1",
  LA: "la1",
  KR: "kr",
  OCE: "oc1",
  PH: "ph2",
  RU: "ru",
  SG: "sg2",
  TH: "th2",
  TR: "tr1",
  TW: "tw2",
  VN: "vn2",
};

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
  const regionOptions = Object.entries(regions).map(([key, value]) => (
    <option key={key} value={value}>
      {key}
    </option>
  ));

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="summonerName"
        placeholder="Summoner Name"
        value={summonerName}
        onChange={(e) => handleFormData(e)}
      />
      <select name="region" id="region" onChange={(e) => handleFormData(e)}>
        {regionOptions}
      </select>
      <button>Submit</button>
    </form>
  );
};

export default SummonerSearch;
