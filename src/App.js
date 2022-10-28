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
import Created from './components/page_components/Created';
import Example from './components/page_components/Example'
import Share from './components/page_components/Share';
import About from "./components/page_components/About";

function App () {

  /* ------------------------------------------ App Wide Variables and State ------------------------------------------ */

  /* Data of the event is stored in event state at App.js to eliminate the need to repeatedly query the database.

  We also store data called blocks which is data that facilitates the creation of grids in the AttendanceChart.js and Grid.js components
  to visually represent availability */

  const BACKEND_URL = process.env.REACT_APP_BACKEND + "events/";
  const FRONTEND_URL = process.env.REACT_APP_FRONTEND;

  //Stores the data of an event
  const [event, setEvent] = useState(null);

  /*Stores data used to organize the display components into blocks of adjacent days
  (for AttendanceChart.js and Grid.js) */
  const [blocks, setBlocks] = useState([]);

  //Set blockMax based on the device the app is being viewed on.
  const blockMaxHelper = () => {
    const phoneWidth = window.matchMedia("(max-width: 599px)");
    const tabletPortraitWidth = window.matchMedia("(max-width: 899px)");
    const tabletLandscapeWidth = window.matchMedia("(max-width: 1199px)");

    if (phoneWidth.matches) return 3;
    else if (tabletPortraitWidth.matches) return 4;
    else if (tabletLandscapeWidth.matches) return 5;
    else return 7
  };

  console.log(`The size screen means that max blocks should be ${blockMaxHelper()}`)

  //Stores the maximum number of days that a block can posses
  const [blockMax, setBlockMax] = useState(blockMaxHelper());

  // useEffect(() => {
  //   setBlockMax(blockMaxHelper);
  //   makeBlocks(event.days);
  // })

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
        <Route path='/create' element={<CreateForm getEventData={getEventData} FRONTEND_URL={FRONTEND_URL} BACKEND_URL={BACKEND_URL}/>} />
        <Route path='/created/:id' element={<Created URL={FRONTEND_URL}/>} />
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
