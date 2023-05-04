import { useEffect, useState } from "react";
import { getMatch, getMatchHistoryData } from "../../services";
import MatchHistoryBlock from "./MatchHistoryBlock";

type MatchInfo = {
  matchId: string;
  data: any;
};

// data.info.
// data.info.partcipants etc

const MatchHistory = ({
  summonerName,
  region,
}: {
  summonerName: string;
  region: string;
}) => {
  const [matches, setMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState<MatchInfo[]>([]);
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
      console.log(matchInfo, "matchinfo");
    }
  };

  const sortMatchInfo = () => {
    if (matchInfo) {
      return matchInfo.map((match) => {
        return (
          <MatchHistoryBlock
            key={match.matchId} /*{match.data.info.tft_game_type}*/
          />
        );
      });
    }
    return <h1>nothing found</h1>;
  };

  useEffect(() => {
    getMatchesInfo();
  }, [matches]);

  return (
    <div>
      <h1>Match History</h1>
      <button
        className="bg-green-700 py-3 rounded px-3"
        onClick={() => getMatchHistoryIDs()}
      >
        getMatchHistoryData
      </button>
      <div>{sortMatchInfo()}</div>
    </div>
  );
};

export default MatchHistory;
