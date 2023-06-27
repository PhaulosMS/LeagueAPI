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

const MatchHistory = ({
  region,
  puuid,
}: {
  region: string;
  puuid: string;
  summonerName: string;
}) => {
  const [matches, setMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState<MatchInfo[]>([]);
  const [playerGameInfo, setPlayerGameInfo] = useState<
    PlayerGameInfoType[] | null
  >(null);

  const getMatchHistoryIDs = async () => {
    const response = await getMatchHistoryData(puuid, region);
    setMatches(response);
  };

  const getMatchesInfo = async () => {
    const unFetchedMatches = matches.filter((match) => {
      return !matchInfo.some((info) => info.matchId === match);
    });

    if (unFetchedMatches.length > 0) {
      const response = await Promise.all(
        unFetchedMatches.map(async (match) => {
          const data = await getMatch(match, region);
          return { matchId: match, data };
        })
      );

      setMatchInfo((prevMatchInfo) => [...prevMatchInfo, ...response]);
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
    return null;
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

  useEffect(() => {
    getPlayerData();
    getMatchHistoryIDs();
    if (matches.length > 0) {
      getMatchesInfo();
    }
  }, [matchInfo, puuid, matches.length]); // need to use a better method than matches.length due to calling api 10 times? idk if that's good

  return (
    <div>
      {playerGameInfo && playerGameInfo.length > 0 ? (
        <div>{sortMatchInfo()}</div>
      ) : (
        <div>Loading Data...</div>
      )}
    </div>
  );
};

export default MatchHistory;
