//Dependencies
import { React, useState } from 'react';

//Styling
import '../../styles/page_styling/home.scss';

const Home = ({setRoot}) => {

/* ------------------------------------------ Component Variables & State ------------------------------------------*/
  
  const [search, setSearch] = useState("");
  setRoot("rb-landing");

/* ------------------------------------------ Helper Functions ------------------------------------------*/

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

/* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div id="home-shell" className="page-body">
      <h2>Kick it</h2>
      <label htmlFor="search" id="searchLabel">
        <input id="search" type="text" name="search" value={search} onChange={handleChange} placeholder="Enter event title or id to search"/>
      </label>
    </div>
  )
}

export default Home;