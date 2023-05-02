import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import SummonerForm from "../pages/SummonerForm/SummonerForm";
import Navbar from "../components/Navbar/Navbar";
import ErrorPageNotFound from "../pages/ErrorPageNotFound/ErrorPageNotFound";
import TeamfightTactics from "../pages/TeamfightTactics/TeamfightTactics";
import TFTLeaderboard from "../pages/TFTLeaderboard/TFTLeaderboard";
import "./global.css";
import PlayerRank from "../components/PlayerRank/PlayerRank";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SummonerForm" element={<SummonerForm />} />
        <Route path="/tft" element={<TeamfightTactics />} />
        <Route path="/leaderboard" element={<TFTLeaderboard />} />
        <Route path="/playerRank" element={<PlayerRank />} />
        <Route path="*" element={<ErrorPageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
