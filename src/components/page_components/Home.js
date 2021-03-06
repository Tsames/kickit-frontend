//Dependencies
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Styling
import '../../styles/page_styling/home.scss';

const Home = ({setRoot}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //Set root style based on page
  setRoot("rb-landing");

  //State that stores the input for the search bar
  const [search, setSearch] = useState(""); 
  
  //stores the events the search returns
  let result = null;

  const SEARCH_URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/search/" + search;

  /* ------------------------------------------ Helper Functions ------------------------------------------ */
  
  //Helper function (handleSearch) - Searches and retrieves event data based on id
  const searchEvents = async () => {
    try {
      //Fetch event data
      const response = await fetch(SEARCH_URL);
      const data = await response.json()

      //Set event state
      result = data;

    } catch (error) {
      console.log(error);
    }
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Handler function - Updates search state
  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  //Handler function - runs a search and if successfull navigates to that events share page
  const handleSearch = async (event) => {
    if (event.which === 13) {
      await searchEvents();
      navigate("/share/" + result[0]._id)
    }
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="home-shell" className="page-body">
      <h2>Kick it</h2>
      <label htmlFor="search" id="search-Label">
        <input id="search" type="text" name="search" value={search} onChange={handleChange} onKeyDown={handleSearch} placeholder="Enter event id"/>
        {/* <button id="search-button" onClick={handleSearch}><BiSearchAlt id="search-icon"></BiSearchAlt></button> */}
      </label>
    </div>
  )
}

export default Home;