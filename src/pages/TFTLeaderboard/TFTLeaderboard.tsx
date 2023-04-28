import { getTFTChallengerLeaderboard } from "../../services";
import { useState, useEffect } from "react";
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

const TFTLeaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const getLeaderboard = async () => {
    const response = await getTFTChallengerLeaderboard();
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

  useEffect(() => {
    getLeaderboard();
    console.log("fetched");
  }, []);

  return (
    <div>
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
  );
};

export default TFTLeaderboard;
