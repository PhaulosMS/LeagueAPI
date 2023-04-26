import { Link } from "react-router-dom";
import Logo from "../../images/rift.gg-1.png";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={Logo} alt="" />
      </Link>
      <Link to="/">Home</Link>
      <Link to="/SummonerForm">Summoner Search</Link>
      <Link to="/tft">TFT</Link>
    </nav>
  );
};

export default Navbar;
