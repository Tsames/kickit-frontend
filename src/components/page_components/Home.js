//Dependencies
import { React, useState } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

//Styling
import '../../styles/page_styling/home.scss';

const Home = ({setRoot}) => {

/* ------------------------------------------ Component Variables & State ------------------------------------------*/
  
//State that stores the input for the search bar
  const [search, setSearch] = useState(""); 
  
  //State that stores the events the search returns
  let result = null;

  const SEARCH_URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/search/" + search;
  setRoot("rb-landing");
  let navigate = useNavigate();

/* ------------------------------------------ Helper Functions ------------------------------------------*/

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = async () => {
    await getEventData();
    navigate("/share/" + result[0]._id)
  }

  //Helper function - Gets Event Data
  const getEventData = async () => {
    try {
      //Fetch event data
      const response = await fetch(SEARCH_URL);
      const data = await response.json()

      //Set event state
      result = data;
      console.log("Afer setting the data in the result the id is:")
      console.log(result);

    } catch (error) {
      console.log(error);
    }
  }


/* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div id="home-shell" className="page-body">
      <h2>Kick it</h2>
      <label htmlFor="search" id="searchLabel">
        <input id="search" type="text" name="search" value={search} onChange={handleChange} placeholder="Enter event title"/>
        <button onClick={handleSearch}><BiSearchAlt></BiSearchAlt></button>
      </label>
    </div>
  )
}

export default Home;