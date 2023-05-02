import { Link } from "react-router-dom";
import Logo from "../../images/rift.gg-1-edited.png";
import styles from "./styles.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className={styles.navbarItems}>
        <Link to="/SummonerForm">League of Legends</Link>
        <Link to="/tft">Teamfight Tactics</Link>
        {/* <Link to="/lor">Legends of Runterra</Link> */}
        <Link to="/leaderboard">TFT Challenger Leaderboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
