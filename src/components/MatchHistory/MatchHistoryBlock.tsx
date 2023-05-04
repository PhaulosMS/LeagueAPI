import Umbra from "../../images/tacticians/Tooltip_Umbra_Classic_Tier3.png";
import Brawler from "../../images/traits/Trait_Icon_3_Brawler.png";

const MatchHistoryBlock = () => {
  // for each trait create an container, img, background of trait style

  return (
    <div>
      <div>
        <div className="text-yellow-500 border border-yellow-500 w-max px-1">
          1
        </div>
        <div>Ranked</div>
        <div>31:56</div>
      </div>
      <div className="">
        <img className="rounded-full w-24 md:rounded-none" src={Umbra} alt="" />
      </div>
      <div className="backgroundTraitGold w-max h-max p-1 items-center bg-center bg-no-repeat bg-cover content-center align-middle">
        <div>
          <img className="h-4 w-4 align-middle" src={Brawler} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryBlock;
