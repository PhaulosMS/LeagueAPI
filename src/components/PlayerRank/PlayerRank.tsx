import { useState, useEffect } from "react";
import { RankIcons } from "../../data/data";
import defaultIcon from "../../images/ranks/TFT_Regalia_Provisional.png";

//TODO handle more of the error checking, player is purely unranked 0 games,
// or just unranked cause of not hitting placements

type PlayerRankProps = {
  tier: string;
  rank: string;
  wins?: number;
  losses?: number;
  LP: number;
};

const PlayerRank = ({
  tier = "unranked",
  rank = "",
  wins = 0,
  losses = 0,
  LP,
}: PlayerRankProps) => {
  const [unranked, setUnranked] = useState<boolean>(true);

  const calculateStats = () => {
    const played = wins + losses;
    const winRate = Math.ceil((wins / played) * 100);
    return { played, winRate };
  };

  const getRankIconUrl = (tier: string): string => {
    for (const rank in RankIcons) {
      if (rank.toLowerCase() === tier.toLowerCase()) {
        return RankIcons[rank];
      }
    }
    return defaultIcon;
  };

  const StatItem = ({
    left,
    right,
  }: {
    left: string;
    right: string | number;
  }) => (
    <div className="flex justify-between">
      <span className="text-left">{left}</span>
      <span className="text-right">{right}</span>
    </div>
  );

  useEffect(() => {
    setUnranked(tier !== "unranked" ? true : false);
  }, [tier]);

  return (
    <div className="bg-[#31313b] rounded-md border border-black">
      <div className="flex items-center p-2 border-b   border-black ">
        <img className="w-24 mr-3" src={getRankIconUrl(tier)} alt="" />
        <div>
          <div className="text-2xl">Tier</div>
          <span className=" text-2xl capitalize">
            {tier.toLocaleLowerCase()}
          </span>
          <span className="text-2xl"> {rank} </span>
          {unranked !== false && <span className="text-2xl"> {LP} LP</span>}
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-3 p-3">
        <StatItem left="Top 4:" right={wins} />
        <StatItem left="Top 4 Rate:" right={`${calculateStats().winRate}%`} />
        <StatItem left="Bottom 4" right={losses} />
        <StatItem left="Played:" right={calculateStats().played} />
      </div>
    </div>
  );
};

export default PlayerRank;
