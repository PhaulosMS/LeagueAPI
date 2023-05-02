import unrankedIcon from "../images/ranks/TFT_Regalia_Provisional.png";
import ironIcon from "../images/ranks/TFT_Regalia_Iron.png";
import bronzeIcon from "../images/ranks/TFT_Regalia_Bronze.png";
import silverIcon from "../images/ranks/TFT_Regalia_Silver.png";
import goldIcon from "../images/ranks/TFT_Regalia_Gold.png";
import platIcon from "../images/ranks/TFT_Regalia_Platinum.png";
import diamondIcon from "../images/ranks/TFT_Regalia_Diamond.png";
import masterIcon from "../images/ranks/TFT_Regalia_Master.png";
import grandmasterIcon from "../images/ranks/TFT_Regalia_GrandMaster.png";
import challengerIcon from "../images/ranks/TFT_Regalia_Challenger.png";

export const regions: { [id: string]: string } = {
  EUW: "euw1",
  NA: "na1",
  EUNE: "eun1",
  BR: "br1",
  JP: "jp1",
  LA: "la1",
  KR: "kr",
  OCE: "oc1",
  PH: "ph2",
  RU: "ru",
  SG: "sg2",
  TH: "th2",
  TR: "tr1",
  TW: "tw2",
  VN: "vn2",
};

export const RankIcons: { [id: string]: string } = {
  Unranked: unrankedIcon,
  Iron: ironIcon,
  Bronze: bronzeIcon,
  Silver: silverIcon,
  Gold: goldIcon,
  Platinum: platIcon,
  Diamond: diamondIcon,
  Master: masterIcon,
  Grandmaster: grandmasterIcon,
  Challenger: challengerIcon,
};
