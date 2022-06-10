//Dependencies
import { React, useState } from 'react';
import { Link } from 'react-router-dom';

//Import Components
import Field from "../input_components/Grid";

//Styling
import '../../styles/page_styling/home.scss';

const Home = () => {

/* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const [search, setSearch] = useState("");

/* ------------------------------------------ Helper Functions ------------------------------------------*/

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

/* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div id="home-shell" className="page-body">
      <h2>Kick <span id="it">It</span></h2>
      <label for="search" id="searchLabel">
        <input id="search" type="text" name="search" value={search} onChange={handleChange} placeholder="Enter event title or id to search"/>
      </label>
    </div>
  )
}

export default Home;