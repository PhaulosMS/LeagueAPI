import React, {useState } from "react"
import {Link} from "react-router-dom"
import axios from "axios";

type SummonerData = {
    name: string;
    summonerLevel: number;
    profileIconId: number;
  };

const SummonerForm = () => {
    const [summonerData, setSummonerData] = useState<SummonerData | undefined>();
    const [summonerName, setSummonerName] = useState<string>("Bernard the Dog")
    const [region, setRegion] = useState("euw1"); // TODO: Setup form to select region. Default EUW for simplicity sake

    const URL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${import.meta.env.VITE_RIOTAPI_KEY}`

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getSummoner();
    }
    const handleSummonerName = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setSummonerName(e.target.value)
    }

    const handleRegion = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(e.target.value);
    }

    const getSummoner = async () => {
        try {
            const response = await axios.get(URL)
            await setSummonerData(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div>
        <Link to="/">Home</Link>
        <form onSubmit={(e) => handleSumbit(e)}>
            <label htmlFor="SummonerName">Summoner Name</label>
            <input type="text" name="SummonerName" placeholder="Summoner Name" value={summonerName} onChange={e => handleSummonerName(e)}/>
            <button>Submit</button>
                <select name="region" id="region" onChange={e => handleRegion(e)}>
                    <option value="euw1">EUW</option>
                    <option value="na1">NA</option>
                </select>
        </form>
     
        
        {summonerData && (
        <>
          <h1>{summonerData.name} - {summonerData.summonerLevel}</h1>
          <img src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${summonerData.profileIconId}.png`} alt="" />
        </>
      )}
    </div>
  )
  }
export default SummonerForm