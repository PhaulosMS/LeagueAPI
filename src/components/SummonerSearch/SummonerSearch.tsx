import React, { useEffect, useRef } from "react";
import { regions } from "../../data/data";
import { useLocation } from "react-router-dom";

type SummonerFormData = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  summonerName: string;
  region: string;
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
  region,
}: SummonerFormData) => {
  const regionOptions = Object.entries(regions).map(([key, value]) => (
    <option key={key} value={value}>
      {key}
    </option>
  ));

  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);

  // trying to get it to autosubmit if it's the correct path, and yeah

  useEffect(() => {
    if (location.pathname.includes("/tft") && summonerName != "")
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
  }, [location.pathname, region, summonerName]);

  return (
    <div className="w-max max-w-md border-2 border-black rounded bg-[#121212]">
      <form ref={formRef} className="flex" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="bg-[#121212] mx-4 focus:outline-none"
          type="text"
          name="summonerName"
          placeholder="Summoner Name"
          value={summonerName.replaceAll("%20", "")}
          maxLength={20}
          onChange={(e) => handleFormData(e)}
        />
        <select
          className="bg-[#121212] outline-none border-none rounded appearance-none px-3 text-center"
          name="region"
          onChange={(e) => handleFormData(e)}
          value={region}
        >
          {regionOptions}
        </select>
        <button className="bg-green-700 p-3 rounded">Submit</button>
      </form>
    </div>
  );
};

export default SummonerSearch;
