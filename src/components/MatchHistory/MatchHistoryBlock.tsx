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

export const MatchHistoryBlock = ({
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

    //Glitch = LeBlanc carry I do not know why do
    const HeroColours = () => {
      if (augment_id.includes("Carry") || augment_id.includes("Glitch"))
        return "border-purple-700 border-2 rounded-sm overflow-hidden";
      else if (
        augment_id.includes("Support") ||
        augment_id.includes("StarCrossed") ||
        augment_id.includes("Reflection")
      )
        return "border-green-700 border-2 rounded-sm overflow-hidden";
      else return "border-2 border-gray-800 rounded-full overflow-hidden";
    };

    // Manipulating the string because riot sometimes gives back weird strings and makes it complicated for no reason
    let augment_id_manipulated = augment_id;
    augment_id_manipulated = augment_id_manipulated.replace(
      /Carry|Support|5_|augment_|Glitch|HyperRoll/gi,
      ""
    );
    // If the augment is a champion augment basically add .TFT_SET8.png as normal augments don't have this image ending
    if (
      augment_id.includes("Carry") ||
      augment_id.includes("Support") ||
      augment_id.includes("Glitch") ||
      augment_id.includes("StarCrossed") ||
      augment_id.includes("Reflection")
    ) {
      augment_id_manipulated += ".TFT_Set8.png";
    }

    //console.log(augment_id_manipulated); //uncomment this if augments aren't loading

    return (
      <div className={HeroColours()}>
        <img
          src={`augments/${
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
        <img className="h-4 w-4" src={`/TraitIcons/${dataImageURL}`} alt="" />
      </div>
    );
  };

  const Champion = ({ character_id }: any) => {
    let borderColourString =
      "border-4 border-purple-600 rounded-md overflow-hidden";
    let dataImageURL = "";
    if (dataChamps && dataChamps[character_id]) {
      dataImageURL = dataChamps[character_id]["image"]["full"];
      if (dataImageURL.includes("blanc")) {
        dataImageURL = dataImageURL.replace("blanc", "Blanc");
      }
    }

    if (dataChamps && dataChamps[character_id]) {
      switch (dataChamps[character_id]["tier"]) {
        case 1:
          borderColourString =
            "border-4 border-gray-600 rounded-md overflow-hidden";
          break;
        case 2:
          borderColourString =
            "border-4 border-green-600 rounded-md overflow-hidden";
          break;
        case 3:
          borderColourString =
            "border-4 border-blue-600 rounded-md overflow-hidden";
          break;
        case 4:
          borderColourString =
            "border-4 border-purple-600 rounded-md overflow-hidden";
          break;
        case 5:
          borderColourString =
            "border-4 border-yellow-600 rounded-md overflow-hidden";
          break;
        default:
          borderColourString =
            "border-4 border-purple-600 rounded-md overflow-hidden";
          break;
      }
    }

    return (
      <div className={borderColourString}>
        <img
          src={`/augments/hero/${dataImageURL ? dataImageURL : "TFT8_Zac.png"}`}
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

  const sortPlacement = () => {
    let borderColourStrring =
      "text-yellow-500 border border-yellow-500 w-max px-1 mr-4 scale-150";
    switch (Placement) {
      case 1:
        borderColourStrring =
          "text-yellow-500 border border-yellow-500 w-max px-1 mr-4 scale-150";
        break;
      case 2:
      case 3:
      case 4:
        borderColourStrring =
          "text-blue-500 border border-blue-500 w-max px-1 mr-4 scale-150";
        break;
      default:
        borderColourStrring =
          "text-gray-500 border border-gray-500 w-max px-1 mr-4 scale-150";
        break;
    }
    return <div className={borderColourStrring}>{Placement}</div>;
  };

  const sortPlacementBorder = () => {
    let placementColour = "";
    switch (Placement) {
      case 1:
        placementColour = "border-yellow-500";
        break;
      case 2:
      case 3:
      case 4:
        placementColour = "border-blue-800";
        break;
      default:
        placementColour = "border-gray-500";
        break;
    }
    return placementColour;
  };

  const handleTactician = () => {
    if (
      dataTactician &&
      dataTactician[Tactician.item_ID].id == Tactician.item_ID
    ) {
      return `/tacticians/${dataTactician[Tactician.item_ID]["image"]["full"]}`;
    }
    return "/tacticians/Tooltip_TFT_Avatar_Blue.png";
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
      <div
        className={`bg-gray-800 flex mt-4 border-4 p-4 items-center rounded-md ${sortPlacementBorder()}`}
      >
        {sortPlacement()}
        <div className="w-20">
          <div className="">{queueIdConversion()}</div>
          <div>{FormatTime(Length)}</div>
        </div>
        <div className="flex items-center ml-2">
          <div className="relative inline-block">
            <img
              className="rounded-full w-12 h-12 object-cover relative z-1 border-4 border-[#ca9372]"
              src={handleTactician()}
              alt=""
            />
            <span className="absolute z-10 top-8 right-0 bg-black text-center h-5 w-5 border-2 border-[#ca9372] rounded-full text-xs text-[#ca9372]">
              {Level}
            </span>
          </div>
        </div>
        <div className="flex ml-2 w-36 flex-wrap">{sortTraits()}</div>
        <div className="flex  mx-4">
          <div className="flex flex-col gap-1 ">{sortAugments()}</div>
        </div>
        <div className="flex gap-2 mr-3">{sortUnits()}</div>
        <div className="ml-auto">
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
  );
};

export default MatchHistoryBlock;
