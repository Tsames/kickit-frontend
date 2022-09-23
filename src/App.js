//Dependencies
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

//Import Nav & Footer Components
import Navbar from './components/page_components/Navbar';
import Footer from './components/page_components/Footer';

//Import Main Pages
import Home from './components/page_components/Home';
import CreateForm from './components/form_components/CreateForm';
import Share from './components/page_components/Share';
import Attend from './components/page_components/Attend';
import Peek from './components/page_components/Peek';
import About from "./components/page_components/About";

//Import Confirmation Pages
import CreateEventSuccess from './components/confirmation_components/CreateEventSuccess';
import AddAvailabilitySuccess from './components/confirmation_components/AttendSuccess';
import AttendSuccess from "./components/confirmation_components/AttendSuccess";


function App () {

  /* ------------------------------------------ App Wide Variables and State ------------------------------------------ */

  /* Data of the event is stored in event state at App.js to eliminate the need to repeatedly query the database.

  We also store data called blocks which is data that facilitates the creation of grids in the AttendanceChart.js and Grid.js components
  to visually represent availability */

  //Stores the data of an event
  const [event, setEvent] = useState(null);

  //Stores data used to organize the display components into blocks of adjacent days
  //(for AttendanceChart.js and Grid.js)
  const [blocks, setBlocks] = useState([]);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/";
  const FRONTEND_URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/";

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  /* Helper function (getEventData) - arranges the days array into sub arrays of only adjacent
  days and sets the result in blocks state */
  const makeBlocks = (daysArray) => {
    const newBlocks = [], data = [...daysArray];
    while (data.length > 0) {
      const smallBlock = [];
      smallBlock.push(data.shift());
      while (Number(data[0]) - Number(smallBlock[smallBlock.length - 1]) <= 86400000) {
        smallBlock.push(data.shift());
      }
      newBlocks.push(smallBlock);
    }

    setBlocks(newBlocks);
  }

  /* ------------------------------------------ Passing Functions ------------------------------------------ */
  
  //Passing function - Sets the class of root or nav
  const setRoot = (newClassRoot=null, newClassNav=null) => {
    //Set the class of root
    if (newClassRoot !== null) {
      const root = document.getElementById("root");
      root.className = "";
      root.className = newClassRoot;
    }

    //Set the class of Nav
    if (newClassNav !== null) {
      const navbar = document.getElementById("navbar");
      navbar.className = "";
      navbar.className = newClassNav;
    }
  }

  //Passing function - Gets Event Data and stores in state
  const getEventData = async (id) => {
    try {
      //Fetch event data
      const response = await fetch(BACKEND_URL + `${id}`);
      const data = await response.json()

      //Set block state
      makeBlocks(data.days)

      //Set event state
      setEvent(data);

    } catch (error) {
      console.log("Couldn't get event.");
      console.log(error);
    }
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home setRoot={setRoot} getEventData={getEventData}/>} />
        <Route path='/create' element={<CreateForm setRoot={setRoot} getEventData={getEventData} URL={BACKEND_URL}/>} />
        <Route path='/share/:id' element={<Share setRoot={setRoot} getEventData={getEventData} event={event} />} />
        <Route path='/attend/:id' element={<Attend getEventData={getEventData} event={event} blocks={blocks} URL={BACKEND_URL} /> } />
        <Route path='/peek/:id' element={<Peek getEventData={getEventData} event={event} blocks={blocks} />} />
        <Route path='/created/:id' element={<CreateEventSuccess setRoot={setRoot} getEventData={getEventData} event={event} URL={FRONTEND_URL} />} />
        <Route path='/attend/submitted/:id' element={<AttendSuccess setRoot={setRoot} getEventData={getEventData} />} />
        <Route path='/about/how' element={<About page={1}/>} />
        <Route path='/about/who' element={<About page={2}/>} />
        <Route path='/create/success/:id' element={<CreateEventSuccess setRoot={setRoot} getEventData={getEventData} event={event}/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
