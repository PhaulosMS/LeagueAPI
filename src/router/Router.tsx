import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import SummonerForm from "../pages/SummonerForm";
import Navbar from "../components/Navbar/Navbar";
import ErrorPageNotFound from "../pages/ErrorPageNotFound/ErrorPageNotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SummonerForm" element={<SummonerForm />} />
        <Route path="*" element={<ErrorPageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
