import { useState, useEffect } from "react";
import SummonerSearch from "../../components/SummonerSearch/SummonerSearch";
import { getSummonerData, getTFTRankedData } from "../../services";
import { SummonerForm } from "../../types/summonerDataTypes";
import PlayerRank from "../../components/PlayerRank/PlayerRank";
import MatchHistory from "../../components/MatchHistory/MatchHistory";
import { useParams } from "react-router-dom";

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

  const params = useParams<{ id?: string; region?: string }>();
  const summonerParam = params.id ?? "";
  const regionParam = params.region ?? "";

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
      [region]: regionParam,
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
    setSummonerState((prevState) => ({
      ...prevState,
      summonerName: summonerParam,
      region: regionParam,
    }));
  }, [params]); // need to update region query params only summername is working

  useEffect(() => {
    getTFTRankedStats();
  }, [summonerData]); // maybe no dependcy

  //SummonerSearch basically not being shown, only used to send a form submit automatically.
  return (
    <div className="mx-48">
      <div className="grid grid-cols-3 gap-4">
        <div className="scale-0 m-0 p-0 h-0 w-0">
          <SummonerSearch
            handleSubmit={handleSubmit}
            handleFormData={handleFormData}
            summonerName={summonerName}
            region={regionParam}
          />
        </div>

        {error ? (
          <h1 className="text-red-600 mt-6 font-bold text-lg">
            Summoner not found
          </h1>
        ) : (
          summonerData && (
            <div className="col-start-1 col-end-1 row-end-1">
              <div className="flex flex-col items-center mt-8 relative">
                <img
                  className="border border-white rounded-sm w-80"
                  src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${summonerData.profileIconId}.png`}
                  alt=""
                />
                <p className="dark:bg-white dark:text-black bg-black text-white px-2.5 py-0.5 rounded-lg absolute bottom-16 text-[20px]">
                  {summonerData.summonerLevel}
                </p>
                <h1 className="mb-3 mt-4 font-bold text-[32px]">
                  {summonerData.name}
                </h1>
              </div>
            </div>
          )
        )}
        <div className="row-start-1 w-96 m-auto">
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
          <div className="col-start-2 col-end-4 col-span-3 row-start-[-2] row-span-4 max-w-screen-xl">
            <MatchHistory
              region={region}
              puuid={summonerData.puuid}
              summonerName={summonerData.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamfightTactics;
