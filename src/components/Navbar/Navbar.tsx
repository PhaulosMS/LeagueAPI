import { Link } from "react-router-dom";
import Logo from "../../images/rift.gg-1-edited.png";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img className="navbar-logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="navbar-items">
        <Link to="/SummonerForm">Summoner Search</Link>
        <Link to="/tft">TFT</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
