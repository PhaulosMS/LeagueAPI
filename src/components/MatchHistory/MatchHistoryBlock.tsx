import Umbra from "../../images/tacticians/Tooltip_Umbra_Classic_Tier3.png";
import Brawler from "../../images/traits/Trait_Icon_3_Brawler.png";
import SG from "../../images/augments/Star-Guardian-Crown.TFT_Set8.png";
import AA from "../../images/augments/AncientArchives3.png";
import KS from "../../images/augments/hero/TFT8_Kaisa.TFT_Set8.png";
import ASol from "../../images/augments/hero/TFT8_AurelionSol.TFT_Set8.png";

const MatchHistoryBlock = () => {
  const Augment = () => {
    return (
      <div className="flex flex-col m-4 gap-1">
        <div>
          <img src={KS} alt="" className="h-8 w-8 " />
        </div>
        <div>
          <img src={AA} alt="" className="h-8 w-8 " />
        </div>
        <div>
          <img src={SG} alt="" className="h-8 w-8" />
        </div>
      </div>
    );
  };

  const Trait = () => {
    return (
      <div className="tft-hexagon-gold h-6 w-6 bg-no-repeat flex items-center justify-center">
        <img className="h-4 w-4" src={Brawler} alt="" />
      </div>
    );
  };

  const Champion = () => {
    return (
      <div className="border-4 border-blue-700 rounded-md overflow-hidden">
        <img src={ASol} alt="" className="w-10" />
      </div>
    );
  };

  return (
    <div className="flex mt-4 border-4 border-green-800 p-4 items-center rounded-md ">
      <div className="text-yellow-500 border border-yellow-500 w-max px-1 mr-4 scale-150">
        1
      </div>
      <div>
        <div>Ranked</div>
        <div>31:56</div>
      </div>
      <div className="flex items-center ml-2">
        <div>
          <img
            className="rounded-full w-12 h-12 object-cover"
            src={Umbra}
            alt=""
          />
        </div>
        <div className="flex ml-2">
          <Trait />
          <Trait />
          <Trait />
          <Trait />
          <Trait />
        </div>
      </div>
      <div className="flex items-center">
        <Augment />
        <div className="flex gap-2">
          <Champion />
          <Champion />
          <Champion />
          <Champion />
          <Champion />
          <Champion />
          <Champion />
          <Champion />
          <Champion />
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryBlock;
