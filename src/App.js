//Dependencies
import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

//Import Nav & Footer Components
import Navbar from './components/page_components/Navbar';
import Footer from './components/page_components/Footer';

//Import Example Event Data
import { exampleEvent, exampleBlocks } from "./exampleEvent";

//Import Main Pages
import Home from './components/page_components/Home';
import CreateForm from './components/form_components/CreateForm';
import Example from './components/page_components/Example'
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

  /*Stores data used to organize the display components into blocks of adjacent days
  (for AttendanceChart.js and Grid.js) */
  const [blocks, setBlocks] = useState([]);

  //Stores the maximum number of days that a block can posses
  const [blockMax, setBlockMax] = useState(7);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/";
  const FRONTEND_URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/";

  //Set blockMax based on the device the app is being viewed on.
  useEffect(() => {
    const deviceWidth = window.matchMedia("(max-width: 599px)");
    if (deviceWidth.matches) setBlockMax(3);
  }, []);

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  /* Helper function (getEventData) - arranges the days array into sub arrays of only adjacent
  days and sets the result in blocks state */
  const makeBlocks = (daysArray) => {
    const newBlocks = [], data = [...daysArray];

    //Iteratie while there is still data
    while (data.length > 0) {

      //Helper Variable & Return Array
      let lastDate = data.shift()
      const smallBlock = [];

      //Add the first date to new block
      smallBlock.push(lastDate);

      //Iterate for blockMax
      for(let i=1; i < blockMax; i++) {
        //If lastDate helper is null then push the first element of data
        if (data.length > 0 && lastDate === null) {
          lastDate = data.shift()
          smallBlock.push(lastDate);
        }
        //If the first element of data is within one day of the last element push it to smallBlock
        else if (data.length > 0 && Number(data[0]) - Number(lastDate) <= 86400000) {
          lastDate = data.shift()
          smallBlock.push(lastDate);
        } 
        //Else add null to the smallBlock (representing empty column) and set lastDate to null
        else if (data.length > 0) {
          lastDate = null;
          smallBlock.push(lastDate);
        }
      }

      newBlocks.push(smallBlock);
    }

    setBlocks(newBlocks);
  }

  /* ------------------------------------------ Passing Functions ------------------------------------------ */

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
        <Route path='/' element={<Home getEventData={getEventData}/>} />
        <Route path='/create' element={<CreateForm getEventData={getEventData} URL={BACKEND_URL}/>} />
        <Route path='/created/:id' element={<CreateEventSuccess getEventData={getEventData} event={event} URL={FRONTEND_URL} />} />
        <Route path='/example' element={<Example event={exampleEvent} blocks={exampleBlocks}/>} />
        <Route path='/share/:id' element={<Share getEventData={getEventData} event={event} blocks={blocks} URL={BACKEND_URL}/>} />
        <Route path='/about/how' element={<About/>} />
        <Route path='/about/who' element={<About/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
