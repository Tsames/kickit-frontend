//Dependencies
import { React, useState, useEffect } from 'react';

//Import Components
import AttendanceChart from "../display_components/AttendanceChart";
import EventDetails from "../display_components/AttendanceChart";
import AttendForm from "../form_components/AttendForm";

//Styling
import '../../styles/form_styling/attend_form.scss';

const ViewEvent = ({match, setRoot}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const id = match.params.id;
  const URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/" + id;
  setRoot("rb-view-event");

  //Stores event data
  const [event, setEvent] = useState(null);

  //Stores data used to display attendance
  const [blocks, setBlocks] = useState([]);

  //States to keep track of the component that is displayed
  const [page, setPage] = useState(1);

  /* ------------------------------------------ Fetch Event Data & State Helper Functions ------------------------------------------*/

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Event State %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper function - Gets Event Data
  const getEventData = async () => {
    try {
      //Fetch event data
      const response = await fetch(URL);
      const data = await response.json()

      //Set block state
      makeBlocks(data.days)

      //Set event state
      setEvent(data);

    } catch (error) {
      console.log(error);
    }
  }

  //Run to get relevant event data upon first loading
  useEffect(() => getEventData(), []);

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Blocks State %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper function - arranges the days array into sub arrays of only adjacent days
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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Page State %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  const pages = ["details", "attendance", "rsvp"] 

  const togglePage = (whatPage) => {
    setPage(pages[whatPage]);
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  //JSX to display if event is still in the process of loading
  const eventLoading = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  //Determine which page should be displayed
  const eventLoaded = () => {
    if (page === 1) {
      return details()
    } else if (page === 2) {
      return attendance();
    } else {
      return rsvp();
    }
  }

  //Return EventDetails.js component with proper props
  const details = () => {
    return (
      <>
        <EventDetails event={event} />
        <button onClick={togglePage(2)}>View Attendance</button>
        <button onClick={togglePage(3)}>Sign Up!</button>
      </>
    )
  }

  //Return AttendanceChart.js component with proper props
  const attendance = () => {
    return (
      <>
        <button onClick={togglePage(1)}>Back</button>
        <AttendanceChart event={event} blocks={blocks} />
      </>
    )
  }

  //Return AttendForm.js component with proper props
  const rsvp = () => {
    return (
      <>
        <button onClick={togglePage(1)}>Back</button>
        <AttendForm event={event} blocks={blocks} />
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (

    <div id="view-event-shell" className="page-body">
      { event !== null ? eventLoaded() : eventLoading()}
    </div>
  )
}

export default ViewEvent;