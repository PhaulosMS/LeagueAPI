import { useEffect, useState } from "react";
import { getMatchHistory } from "../../services";

//TODO FIX, match history is magic variables, need switch case to determine what routing region also

const MatchHistory = () => {
  const [puuid, setPuuid] = useState<number>();
  const getMatchHistoryData = async () => {
    const response = await getMatchHistory();
    console.log(response, "history?");
  };

  useEffect(() => {
    getMatchHistoryData();
  }, []);

  return <div>MatchHistory</div>;
};

export default MatchHistory;
