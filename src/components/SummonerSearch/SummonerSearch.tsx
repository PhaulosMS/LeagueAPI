import React from "react";
import { regions } from "../../data/data";

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
    <form
      className="flex flex-col w-full max-w-md"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="text-black p-2 mb-2 border-solid border-gray-500 rounded"
        type="text"
        name="summonerName"
        placeholder="Summoner Name"
        value={summonerName}
        onChange={(e) => handleFormData(e)}
      />
      <select
        className="text-black p-2 mb-2 border-solid border-gray-500 rounded"
        name="region"
        onChange={(e) => handleFormData(e)}
      >
        {regionOptions}
      </select>
      <button className="bg-green-700 py-3 rounded">Submit</button>
    </form>
  );
};

export default SummonerSearch;
