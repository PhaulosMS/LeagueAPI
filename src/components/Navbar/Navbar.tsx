import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/SummonerForm">Summoner Search</Link>
      <Link to="/tft">TFT</Link>
    </nav>
  );
};

export default Navbar;
