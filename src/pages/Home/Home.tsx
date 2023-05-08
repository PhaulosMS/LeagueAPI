import SummonerSearch from "../../components/SummonerSearch/SummonerSearch";
import { useState, useEffect } from "react";
import { getSummonerData, getTFTRankedData } from "../../services";
import { SummonerForm } from "../../types/summonerDataTypes";
import { useNavigate } from "react-router-dom";

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

const Home = () => {
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

  const navigate = useNavigate();

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
    navigate(`/tft/${region}/${summonerName}`);
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
    getTFTRankedStats();
  }, [summonerData]); // maybe no dependcy

  return (
    <div>
      <img
        className="-z-10 absolute bg-cover opacity-25 w-[100vw] h-[100vh] object-cover"
        src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_40.jpg"
        alt=""
      />
      <div className="flex justify-center items-center h-screen z-10">
        <SummonerSearch
          handleSubmit={handleSubmit}
          summonerName={summonerName}
          handleFormData={handleFormData}
          region={region}
        />
      </div>
    </div>
  );
};

export default Home;
