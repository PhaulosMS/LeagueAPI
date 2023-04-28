import { getTFTChallengerLeaderboard } from "../../services";
import { useState } from "react";

type LeaderboardResponse = {
  summonerName: string;
  leaguePoints: number;
};

type Player = {
  summonerName: string;
  LP: number;
};

const TFTLeaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const getLeaderboard = async () => {
    const response = await getTFTChallengerLeaderboard();
    const playerData: Player[] = response.map(
      (player: LeaderboardResponse) => ({
        summonerName: player.summonerName,
        LP: player.leaguePoints,
      })
    );
    playerData.sort((P1, P2) => P2.LP - P1.LP);
    setPlayers(playerData);
    console.log(players);
  };

  const sortPlayers = () => {
    return players.map((player, index) => (
      <h1 key={player.summonerName}>
        {index + 1} {player.summonerName} - {player.LP} - Challenger
      </h1>
    ));
  };

  return (
    <div>
      <button onClick={getLeaderboard}>Get Data</button>
      {sortPlayers()}
    </div>
  );
};

export default TFTLeaderboard;
