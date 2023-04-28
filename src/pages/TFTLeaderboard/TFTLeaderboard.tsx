import { getTFTChallengerLeaderboard } from "../../services";
import { useState, useEffect } from "react";

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
        <h1 key={player.summonerName}>
          {index + 1} {player.summonerName} - {player.LP}LP W:{" "}
          {player.summonerWins} L: {player.summonerLosses} - Challenger -{" "}
          {winPercentage}%
        </h1>
      );
    });
  };

  useEffect(() => {
    getLeaderboard();
    console.log("fetched");
  }, []);

  return (
    <div>
      <button onClick={getLeaderboard}>Refresh Data</button>
      {sortPlayers()}
    </div>
  );
};

export default TFTLeaderboard;
