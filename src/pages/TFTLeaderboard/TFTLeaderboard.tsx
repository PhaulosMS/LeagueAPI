import { getTFTChallengerLeaderboard } from "../../services";
import { useState, useEffect, useRef } from "react";
import ChallengerIcon from "../../images/ranks/TFT_Regalia_Challenger.png";
import "./styles.css";

type LeaderboardResponse = {
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

type Player = {
  summonerName: string;
  LP: number;
  summonerWins: number;
  summonerLosses: number;
};

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
    console.log(players);
  };

  const sortPlayers = () => {
    return players.map((player, index) => {
      const games = player.summonerWins + player.summonerLosses;
      const winPercentage = games
        ? Math.ceil((player.summonerWins / games) * 100)
        : 0;
      return (
        <tr className="table-row" key={player.summonerName}>
          <td>{index + 1}</td> <td>{player.summonerName}</td>{" "}
          <td className="table-row-rank">
            <img className="rank-icon" src={ChallengerIcon} alt=""></img>
            <span>Challenger</span>
          </td>
          <td>{player.LP}</td> <td>{player.summonerWins}</td> <td>{games}</td>{" "}
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
      className={`region-icon ${
        regionID === regionRef.current ? "active" : ""
      }`}
      onClick={() => setRegionAndRegionRef(regionID)}
    >
      {region}
    </div>
  ));

  useEffect(() => {
    getLeaderboard();
    console.log("fetched");
  }, [region]);

  return (
    <div>
      {loading ? (
        <h1>Loading... </h1>
      ) : (
        <div>
          <div className="region-selector">{regionSelector}</div>
          <table className="table">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Tier</th>
              <th>LP</th>
              <th>TOP 4</th>
              <th>Played</th>
              <th>Win %</th>
            </tr>
            {sortPlayers()}
          </table>
        </div>
      )}
    </div>
  );
};

export default TFTLeaderboard;
