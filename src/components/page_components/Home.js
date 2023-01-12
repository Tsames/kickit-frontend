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
      <motion.div id="home-landing" variants={containerVariant} initial="initial" animate="animate">
        <motion.button id="createEvent" variants={childVariant} whileHover={{scale: 1.1, backgroundColor: "#4b3dc6", border: "solid", borderColor: "#818DFF"}}>Create Your Event</motion.button>
      </motion.div>
      <div id="home-testimonials">
        <div id="home-testimonial-one" className="home-testimonial-wrapper">
          <h1 id="home-testimonial-quote-one" className="home-testimonial-quote">"Kick It makes it so easy to hang with my pals. Scheduling sucks without it!"</h1>
          <p id="home-testimonial-speaker-one" className="home-testimonial-speaker">-Jimbo</p>
        </div>
      </div>
      <div id="home-contents">
        <div id="home-content-graphic-one" className="home-content-graphic"></div>
        <p id="home-content-text-one" className="home-content-text">Begin by creating an event and giving a few dates that you have available.</p>
        <div id="home-content-graphic-two" className="home-content-graphic"></div>
        <p id="home-content-text-two" className="home-content-text">Share those dates and times with your friends and see when they are free.</p>
        <div id="home-content-graphic-three" className="home-content-graphic"></div>
        <div id="home-content-graphic-four" className="home-content-graphic"></div>
        <p id="home-content-text-three" className="home-content-text">Confirm everyones availability and schedule your event. Its time to.</p>
        <p id="home-content-text-four" className="home-content-text">Kick It!</p>
        <div id="home-content-graphic-five" className="home-content-graphic"></div>
        <div id="home-content-graphic-six" className="home-content-graphic"></div>
        <button>Get Started</button>
      </div>
    </div>
  )
}

export default Home;