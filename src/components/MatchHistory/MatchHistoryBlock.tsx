import DefaultAvatar from "../../images/tacticians/Tooltip_TFT_Avatar_Blue.png";
import Brawler from "../../images/traits/Trait_Icon_3_Brawler.png";
import SG from "../../images/augments/Star-Guardian-Crown.TFT_Set8.png";
import AA from "../../images/augments/AncientArchives3.png";
import KS from "../../images/augments/hero/TFT8_Kaisa.TFT_Set8.png";
import Gold from "../../images/gold.png";
import DamageIcon from "../../images/announce_icon_combat.png";
import axios from "axios";
import { useEffect, useState } from "react";

// pass down augment, traits, currency, length, mode, damage, tactician (might default to river sprite)
//{Augments, Traits, RGold, Length, Mode, Damage, Tactician, Level}

type PlayerInfo = {
  Augments: any;
  Traits: any;
  Units: any;
  RGold: number;
  Length: number;
  Mode: number;
  Damage: number;
  Tactician: string;
  Level: number;
  Placement: number;
};

const MatchHistoryBlock = ({
  Augments,
  Traits,
  Units,
  RGold,
  Length,
  Mode,
  Damage,
  Tactician,
  Level,
  Placement,
}: PlayerInfo) => {
  const [dataChamps, setDataChamps] = useState();

  const FormatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const queueIdConversion = () => {
    switch (Mode) {
      case 1100:
        return "Ranked";
      case 1160:
        return "Double Up";
      case 1090:
        return "Normal";
    }
  };

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
      <div className="tft-hexagon-silver h-6 w-6 bg-no-repeat flex items-center justify-center">
        <img className="h-4 w-4" src={Brawler} alt="" />
      </div>
    );
  };

  const Champion = ({ character_id }: any) => {
    let dataImageURL;
    if (dataChamps && dataChamps[character_id])
      dataImageURL = dataChamps[character_id]["image"]["full"];
    return (
      <div className="border-4 border-blue-700 rounded-md overflow-hidden">
        <img
          src={`src/images/augments/hero/${
            dataImageURL ? dataImageURL : "TFT8_Zac.png"
          }`}
          alt=""
          className="w-10"
        />
      </div>
    );
  };

  const sortUnits = () => {
    return Units.map((unit: any, index: number) => {
      console.log("rendered2222");
      return <Champion key={index} character_id={unit.character_id} />;
    });
  };

  const getDataChamps = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_GB/tft-champion.json"
    );
    setDataChamps(response.data.data);
    console.log(Object.keys(response.data.data));
  };

  useEffect(() => {
    getDataChamps();
  }, []);

  return (
    <div>
      <div className="flex mt-4 border-4 border-green-800 p-4 items-center rounded-md ">
        <div className="text-yellow-500 border border-yellow-500 w-max px-1 mr-4 scale-150">
          {Placement}
        </div>
        <div>
          <div>{queueIdConversion()}</div>
          <div>{FormatTime(Length)}</div>
        </div>
        <div className="flex items-center ml-2">
          <div className="relative inline-block">
            <img
              className="rounded-full w-12 h-12 object-cover relative -z-10 border-2 border-[#ca9372]"
              src={DefaultAvatar}
              alt=""
            />

            <span className="absolute z-10 top-7 right-0 bg-black text-center h-5 w-5 border-2 border-[#ca9372] rounded-full text-xs text-[#ca9372]">
              {Level}
            </span>
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
          <div className="flex gap-2">{sortUnits()}</div>
          <div className="ml-3">
            <div className="flex items-center">
              <h1>{RGold}</h1>
              <img src={Gold} alt="" className="w-4 h-4 " />
            </div>
            <div className="flex items-center">
              <h1>{Damage}</h1>
              <img src={DamageIcon} alt="" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryBlock;
