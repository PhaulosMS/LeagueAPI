import React from "react";
import { regions } from "../../data/data";
import styles from "./styles.module.css";

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
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <input
        className={styles.input}
        type="text"
        name="summonerName"
        placeholder="Summoner Name"
        value={summonerName}
        onChange={(e) => handleFormData(e)}
      />
      <select
        className={styles.select}
        name="region"
        onChange={(e) => handleFormData(e)}
      >
        {regionOptions}
      </select>
      <button className={styles.button}>Submit</button>
    </form>
  );
};

export default SummonerSearch;
