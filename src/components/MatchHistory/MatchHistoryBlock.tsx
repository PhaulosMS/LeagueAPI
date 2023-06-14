import Gold from "../../images/gold.png";
import DamageIcon from "../../images/announce_icon_combat.png";
import axios from "axios";
import { useEffect, useState } from "react";
import starIcon from "../../images/star-svgrepo-com.png";

// RekSai is not being loaded in

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
// TODO change images to DDRAGON I think it's possible...
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
  const [dataItems, setDataItems] = useState();
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

    return (
      <div>
        <img
          src={`../../augments/${dataImageURL}`}
          alt=""
          className="h-8 w-8 rounded-lg"
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
        className={`tft-hexagon-${hexagonColor} flex h-6 w-6 items-center justify-center bg-no-repeat`}
      >
        <img
          className="h-4 w-4"
          src={`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/tft-trait/${dataImageURL}`}
          alt=""
        />
      </div>
    );
  };

  const Champion = ({ unit }: any) => {
    let borderColourString =
      "border-4 border-purple-600 rounded-md overflow-hidden";
    let dataImageURL = "";
    let itemImageURL = "";
    if (unit.character_id == "tft9_reksai")
      unit.character_id.replace("tft9_reksai", "TFT9_RekSai");
    if (dataChamps && dataChamps[unit.character_id]) {
      dataImageURL = dataChamps[unit.character_id]["image"]["full"];

      if (dataChamps && unit && dataChamps[unit.character_id]) {
        switch (dataChamps[unit.character_id]["tier"]) {
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
    }

    console.log(Units);

    const sortItems = () => {
      if (unit.itemNames.length > 0 && dataItems) {
        return unit.itemNames.map((item: string | number, index: number) => {
          if (dataItems[item]) itemImageURL = dataItems[item]["image"]["full"];
          return (
            <img
              className=""
              key={index}
              src={
                itemImageURL
                  ? `https://ddragon.leagueoflegends.com/cdn/13.12.1/img/tft-item/${itemImageURL}`
                  : ""
              }
            />
          );
        });
      }
    };

    const sortStars = () => {
      let starsToRender = 0;
      switch (unit.tier) {
        case 1:
          starsToRender = 1;
          break;
        case 2:
          starsToRender = 2;
          break;
        case 3:
          starsToRender = 3;
          break;
      }

      const stars = [];
      for (let i = 0; i < starsToRender; i++) {
        stars.push(<img key={i} src={starIcon} />);
      }
      return stars;
    };

    return dataImageURL !== "" ? (
      <div className="h-[96px] w-[48px] object-cover">
        <div className="mb-1 flex h-4 w-auto justify-center">{sortStars()}</div>
        <div className={borderColourString}>
          <img src={`/augments/hero/${dataImageURL}`} alt="" />
        </div>
        <div className="mt-1 flex h-4">{sortItems()}</div>
      </div>
    ) : null;
  };
  const sortUnits = () => {
    return Units.map((unit: any, index: number) => {
      return <Champion key={index} unit={unit} />;
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
      //return `/tacticians/${dataTactician[Tactician.item_ID]["image"]["full"]}`;
      return `http://ddragon.leagueoflegends.com/cdn/13.12.1/img/tft-tactician/${
        dataTactician[Tactician.item_ID]["image"]["full"]
      }`;
    }
    return "http://ddragon.leagueoflegends.com/cdn/13.12.1/img/tft-tactician/Tooltip_TFT_Avatar_Blue.png";
  };

  const getTactician = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_GB/tft-tactician.json"
    );
    setDataTactician(response.data.data);
  };

  const getDataChamps = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_GB/tft-champion.json"
    );
    setDataChamps(response.data.data);
  };

  const getDataAugment = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_GB/tft-augments.json"
    );
    setDataAugments(response.data.data);
  };

  const getDataTraits = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_GB/tft-trait.json"
    );
    setDataTraits(response.data.data);
  };

  const getDataItems = async () => {
    const response = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_GB/tft-item.json"
    );
    setDataItems(response.data.data);
  };

  useEffect(() => {
    getDataChamps();
    getDataAugment();
    getDataTraits();
    getTactician();
    getDataItems();
  }, []);

  return (
    <div>
      <div
        className={`mt-4 flex items-center rounded-md border-4 bg-gray-800 p-4 ${sortPlacementBorder()}`}
      >
        {sortPlacement()}
        <div className="w-20">
          <div className="">{queueIdConversion()}</div>
          <div>{FormatTime(Length)}</div>
        </div>
        <div className="ml-2 flex items-center">
          <div className="relative inline-block">
            <img
              className="z-1 relative h-12 w-12 rounded-full border-4 border-[#ca9372] object-cover"
              src={handleTactician()}
              alt=""
            />
            <span className="absolute right-0 top-8 z-10 h-5 w-5 rounded-full border-2 border-[#ca9372] bg-black text-center text-xs text-[#ca9372]">
              {Level}
            </span>
          </div>
        </div>
        <div className="ml-2 flex w-36 flex-wrap">{sortTraits()}</div>
        <div className="mx-4  flex">
          <div className="flex flex-col gap-1 ">{sortAugments()}</div>
        </div>
        <div className="mr-3 flex gap-2">{sortUnits()}</div>
        <div className="ml-auto">
          <div className="flex items-center">
            <h1>{RGold}</h1>
            <img src={Gold} alt="" className="h-4 w-4 " />
          </div>
          <div className="flex items-center">
            <h1>{Damage}</h1>
            <img src={DamageIcon} alt="" className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryBlock;
