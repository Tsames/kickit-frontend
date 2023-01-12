//Dependencies
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

//Styling
import '../../styles/page_styling/home.scss';

const Home = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //Framer-Motion Page Transition Settings
  const fmotion = {
    "initial": { width: 0 },
    "animate": { width: "100%" },
    "exit": { x: window.innerWidth },
    "transition": { duration: 0.4 }
  }

  //State that stores the input for the search bar
  const [search, setSearch] = useState(""); 
  
  //stores the events the search returns
  let result = null;

  const SEARCH_URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/search/" + search;

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (#navbar-shell) Variant
  const containerVariant = {
    initial: { 
      scale: 0,
      x: "-50vw",
      y: "-50vh"
    },
    animate: {
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        when: "beforeChildren" 
      }
    }
  }

  //Child Variants
  const childVariant = {
    initial: { 
      opacity: 0 
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.6
      }
    }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */
  
  //Helper function (handleSearch) - Searches and retrieves event data based on id
  const searchEvents = async () => {
    try {
      //Fetch event data
      const response = await fetch(SEARCH_URL);
      const data = await response.json()

      console.log("success");
      console.log(data);

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
    <div id="home-shell">
      <motion.div id="home-content" variants={containerVariant} initial="initial" animate="animate">
        <motion.button id="createEvent" variants={childVariant}>Create Your Event</motion.button>
      </motion.div>
    </div>
  )
}

export default Home;