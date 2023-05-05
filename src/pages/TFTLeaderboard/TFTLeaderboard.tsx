import { getTFTChallengerLeaderboard } from "../../services";
import { useState, useEffect, useRef } from "react";
import { regions } from "../../data/data";
import ChallengerIcon from "../../images/ranks/TFT_Regalia_Challenger.png";

type LeaderboardResponse = {
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

type Player = {
  key: number;
  summonerName: string;
  LP: number;
  summonerWins: number;
  summonerLosses: number;
};

//TODO: Add links to summoners name

const TFTLeaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [region, setRegion] = useState<string>("euw1");
  const regionRef = useRef(region);

  const getLeaderboard = async () => {
    setLoading(true);
    const response = await getTFTChallengerLeaderboard(region);
    const playerData: Player[] = response.map(
      (player: LeaderboardResponse) => ({
        summonerName: player.summonerName,
        LP: player.leaguePoints,
        summonerWins: player.wins,
        summonerLosses: player.losses,
      })
    );
    playerData.sort((P1, P2) => P2.LP - P1.LP);
    setPlayers(playerData);
    setLoading(false);
  };

  const sortPlayers = () => {
    return players.map((player, index) => {
      const games = player.summonerWins + player.summonerLosses;
      const winPercentage = games
        ? Math.ceil((player.summonerWins / games) * 100)
        : 0;
      return (
        <tr
          key={player.summonerName}
          className="text-center bg-[#393838] border border-gray-700"
        >
          <td>{index + 1}</td>
          <td>{player.summonerName}</td>
          <td className="flex justify-center items-center">
            <img className="w-16 h-16 " src={ChallengerIcon} alt=""></img>
            <span>Challenger</span>
          </td>
          <td>{player.LP}</td>
          <td>{player.summonerWins}</td>
          <td>{games}</td>
          <td>{winPercentage}</td>
        </tr>
      );
    });
  };

  const setRegionAndRegionRef = (regionID: string) => {
    setRegion(regionID);
    regionRef.current = regionID;
  };

  const regionSelector = Object.entries(regions).map(([region, regionID]) => (
    <div
      key={regionID}
      className={`regionIcon ${regionID === regionRef.current ? "active" : ""}`}
      onClick={() => setRegionAndRegionRef(regionID)}
    >
      {region}
    </div>
  ));

  //TODO: Top 5 like U.GG Leaderboards

  // const sortTop5 = () => {
  //   const myArray = players.slice(0, 5);
  //   return myArray.map((player, index) => (
  //     <div>
  //       {index} {player.summonerName}
  //     </div>
  //   ));
  // };

  useEffect(() => {
    getLeaderboard();
    console.log("fetched");
  }, [region]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="">
          <div className="flex justify-center gap-14 max-w-full mx-0 my-3">
            {regionSelector}
          </div>
          <div className="mx-32 my-0 ">
            <table className="w-full">
              <thead>
                <tr className="bg-[#292930]">
                  <th>#</th>
                  <th>Name</th>
                  <th>Tier</th>
                  <th>LP</th>
                  <th>TOP4</th>
                  <th>Played</th>
                  <th>Win%</th>
                </tr>
              </thead>
              <tbody>{sortPlayers()}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TFTLeaderboard;
