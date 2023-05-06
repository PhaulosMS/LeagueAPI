import Gold from "../../images/gold.png";
import DamageIcon from "../../images/announce_icon_combat.png";
import axios from "axios";
import { useEffect, useState } from "react";

// Sort rank border based on placement.
// images are getting called before loaded? i think causing errors of get requests but they do actally load

type PlayerInfo = {
  Augments: any;
  Traits: any;
  Units: any;
  RGold: number;
  Length: number;
  Mode: number;
  Damage: number;
  Tactician: any;
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
  const [dataAugments, setDataAugments] = useState();
  const [dataTraits, setDataTraits] = useState();
  const [dataTactician, setDataTactician] = useState<any>();

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
      case 1130:
        return "Hyper Roll";
    }
  };

  const Augment = ({ augment_id }: any) => {
    let dataImageURL = "";
    if (dataAugments && dataAugments[augment_id]) {
      dataImageURL = dataAugments[augment_id]["image"]["full"];
    }
    const HeroColours = () => {
      if (augment_id.includes("Carry"))
        return "border-purple-700 border-2 rounded-sm overflow-hidden";
      else if (augment_id.includes("Support"))
        return "border-green-700 border-2 rounded-sm overflow-hidden";
    };

    let augment_id_manipulated = augment_id;
    augment_id_manipulated = augment_id_manipulated.replace(
      /Carry|Support|5_|augment_/gi,
      ""
    );
    augment_id_manipulated += ".TFT_Set8.png";
    //console.log(augment_id_manipulated); //uncomment this if augments aren't loading

    return (
      <div className={HeroColours()}>
        <img
          src={`src/images/augments/${
            dataImageURL == "" ? `hero/${augment_id_manipulated}` : dataImageURL
          }`}
          alt=""
          className="h-8 w-8 "
        />
      </div>
    );
  };

  const Trait = ({ trait }: any) => {
    let dataImageURL = "";
    let hexagonColor = "gold";
    if (dataTraits && dataTraits[trait.name]) {
      dataImageURL = dataTraits[trait.name]["image"]["full"];
      switch (trait.style) {
        case 1:
          hexagonColor = "bronze";
          break;
        case 2:
          hexagonColor = "silver";
          break;
        case 3:
          hexagonColor = "gold";
          break;
        case 4:
          hexagonColor = "prismatic";
          break;
      }
    }

    return (
      <div
        className={`tft-hexagon-${hexagonColor} h-6 w-6 bg-no-repeat flex items-center justify-center`}
      >
        <img
          className="h-4 w-4"
          src={`src/images/traits/${dataImageURL}`}
          alt=""
        />
      </div>
    );
  };

  const Champion = ({ character_id }: any) => {
    let borderColour = "purple";
    let dataImageURL;
    if (dataChamps && dataChamps[character_id]) {
      dataImageURL = dataChamps[character_id]["image"]["full"];
    }

    if (dataChamps && dataChamps[character_id]) {
      switch (dataChamps[character_id]["tier"]) {
        case 1:
          borderColour = "gray";
          break;
        case 2:
          borderColour = "green";
          break;
        case 3:
          borderColour = "blue";
          break;
        case 4:
          borderColour = "purple";
          break;
        case 5:
          borderColour = "yellow";
          break;
        default:
          borderColour = "purple";
          break;
      }
    }

    return (
      <div
        className={`border-4 border-${borderColour}-600 rounded-md overflow-hidden`}
      >
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
      return <Champion key={index} character_id={unit.character_id} />;
    });
  };

  const sortAugments = () => {
    return Augments.map((augment: any, index: number) => {
      return <Augment key={index} augment_id={augment} />;
    });
  };

  const sortTraits = () => {
    return Traits.map((trait: any, index: number) => {
      if (trait["style"] > 0 || trait["name"] == "Set8_Threat") {
        return <Trait key={index} trait={trait} />;
      }
    });
  };

  const handleTactician = () => {
    if (
      dataTactician &&
      dataTactician[Tactician.item_ID].id == Tactician.item_ID
    ) {
      return `src/images/tacticians/${
        dataTactician[Tactician.item_ID]["image"]["full"]
      }`;
    }
    return "src/images/tacticians/Tooltip_TFT_Avatar_Blue.png";
  };

  const getTactician = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_GB/tft-tactician.json"
    );
    setDataTactician(response.data.data);
  };

  const getDataChamps = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_GB/tft-champion.json"
    );
    setDataChamps(response.data.data);
  };

  const getDataAugment = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_GB/tft-augments.json"
    );
    setDataAugments(response.data.data);
  };

  const getDataTraits = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_GB/tft-trait.json"
    );
    setDataTraits(response.data.data);
  };

  useEffect(() => {
    getDataChamps();
    getDataAugment();
    getDataTraits();
    getTactician();
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
              src={handleTactician()}
              alt=""
            />
            <span className="absolute z-10 top-8 right-0 bg-black text-center h-5 w-5 border-2 border-[#ca9372] rounded-full text-xs text-[#ca9372]">
              {Level}
            </span>
          </div>
          <div className="flex ml-2">{sortTraits()}</div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col m-4 gap-1">{sortAugments()}</div>

          <div className="flex gap-2">{sortUnits()}</div>
          <div className="ml-3 ">
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
