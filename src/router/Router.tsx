import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import ErrorPageNotFound from "../pages/ErrorPageNotFound/ErrorPageNotFound";
import TeamfightTactics from "../pages/TeamfightTactics/TeamfightTactics";
import TFTLeaderboard from "../pages/TFTLeaderboard/TFTLeaderboard";
import "./globals.css";
const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tft/:region/:id" element={<TeamfightTactics />} />
        <Route path="/leaderboard" element={<TFTLeaderboard />} />
        <Route path="*" element={<ErrorPageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
