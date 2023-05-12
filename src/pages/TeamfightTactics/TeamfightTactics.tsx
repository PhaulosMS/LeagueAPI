import { useState, useEffect } from "react";
import SummonerSearch from "../../components/SummonerSearch/SummonerSearch";
import { getSummonerData, getTFTRankedData } from "../../services";
import { SummonerForm } from "../../types/summonerDataTypes";
import PlayerRank from "../../components/PlayerRank/PlayerRank";
import MatchHistory from "../../components/MatchHistory/MatchHistory";
import { Link, useParams } from "react-router-dom";

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
  }, [params]); //

  useEffect(() => {
    getTFTRankedStats();
  }, [summonerData]); // maybe no dependency

  //SummonerSearch basically not being shown, only used to send a form submit automatically.
  return (
    <div>
      {error && (
        <div className="text-red-600 text-5xl text-center m-10">
          <h1 className="mb-10">Summoner Not Found</h1>
          <Link className="hover:underline text-white" to="/">
            Back to Home Page
          </Link>
        </div>
      )}
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

          {error != true && summonerData && (
            <div className="col-start-1 col-end-1 row-end-1">
              <div className="flex flex-col items-center mt-8 relative">
                <img
                  className="border-2 border-white rounded-sm w-80 overflow-hidden shadow-white shadow-xl"
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
          )}
          <div className="row-start-1 w-96 m-auto">
            {summonerData && (
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
            <div className="col-start-2 col-end-4 col-span-3 row-start-[-2] row-span-4 max-w-screen-xl mt-4">
              <MatchHistory
                region={region}
                puuid={summonerData.puuid}
                summonerName={summonerData.name}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamfightTactics;
