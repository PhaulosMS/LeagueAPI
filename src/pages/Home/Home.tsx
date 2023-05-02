import styles from "./styles.module.css";

const Home = () => {
  return (
    <div className="logo-div">
      <img
        className={styles.logo}
        src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_40.jpg"
        alt=""
      />
    </div>
  );
};

export default Home;
