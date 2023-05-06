import { useEffect, useState } from "react";
import { getMatch, getMatchHistoryData } from "../../services";
import MatchHistoryBlock from "./MatchHistoryBlock";

type MatchInfo = {
  matchId: number;
  data: any;
};

type PlayerGameInfoType = {
  matchId: number;
  goldLeft: number;
  level: number;
  placement: number;
  damageToPlayers: number;
  augments: any;
  traits: any;
  units: any;
  length: number;
  mode: number;
  tactician: any;
};

const PlayerGameInfo: PlayerGameInfoType[] = [];

const MatchHistory = ({
  summonerName,
  region,
  puuid,
}: {
  summonerName: string;
  region: string;
  puuid: number;
}) => {
  const [matches, setMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState<MatchInfo[]>([]);
  const [playerGameInfo, setPlayerGameInfo] =
    useState<PlayerGameInfoType[]>(PlayerGameInfo);
  const getMatchHistoryIDs = async () => {
    const response = await getMatchHistoryData(summonerName, region);
    setMatches(response);
  };

  const getMatchesInfo = async () => {
    if (matches) {
      const response = await Promise.all(
        matches.map(async (match) => {
          const data = await getMatch(match, region);
          return { matchId: match, data };
        })
      );
      setMatchInfo(response);
    }
  };

  const sortMatchInfo = () => {
    if (playerGameInfo) {
      return playerGameInfo.map((match) => {
        return (
          <MatchHistoryBlock
            key={match.matchId}
            Augments={match.augments}
            Traits={match.traits}
            RGold={match.goldLeft}
            Length={match.length}
            Mode={match.mode}
            Damage={match.damageToPlayers}
            Tactician={match.tactician}
            Level={match.level}
            Placement={match.placement}
            Units={match.units}
          />
        );
      });
    }
    return <h1>nothing found</h1>;
  };

  const getPlayerData = async () => {
    const tempPlayerGameInfo: any[] = [];

    for (const match of matchInfo) {
      const participants = match.data.info.participants;
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].puuid === puuid) {
          tempPlayerGameInfo.push(getPlayerGameInfo(i, match));
        }
      }
    }
    setPlayerGameInfo(tempPlayerGameInfo);
  };

  const getPlayerGameInfo = (index: number, match: any) => {
    return {
      matchId: match.matchId,
      goldLeft: match.data.info.participants[index].gold_left,
      level: match.data.info.participants[index].level,
      placement: match.data.info.participants[index].placement,
      damageToPlayers:
        match.data.info.participants[index].total_damage_to_players,
      augments: match.data.info.participants[index].augments,
      traits: match.data.info.participants[index].traits,
      units: match.data.info.participants[index].units,
      length: match.data.info.game_length,
      mode: match.data.info.queue_id,
      tactician: match.data.info.participants[index].companion,
    };
  };

  useEffect(() => {
    getMatchHistoryIDs();
    getMatchesInfo();
    getPlayerData();
  }, [matches]);

  return (
    <div>
      <button
        className="bg-green-700 p-3 rounded-md"
        onClick={() => getMatchHistoryIDs()}
      >
        getMatchHistoryData
      </button>
      <div>{sortMatchInfo()}</div>
    </div>
  );
};

export default MatchHistory;
