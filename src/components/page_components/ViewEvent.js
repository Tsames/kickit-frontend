//Dependencies
import { React, useState, useEffect } from 'react';

//Import Components
import AttendanceChart from "../display_components/AttendanceChart";
import EventDetails from "../display_components/EventDetails";
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

  //Stores data used to organize AttendanceChart.js and Grid.js
  const [blocks, setBlocks] = useState([]);

  //States to keep track of the component that is displayed
  const [page, setPage] = useState("rsvp");

  //Stores data sent back from AttendanceChart.js
  let output = "";

  /* ------------------------------------------ State Helper Functions ------------------------------------------*/

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Event State Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Blocks State Helper %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Page State Helper %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  const togglePage = (event) => {
    setPage(event.target.dataset.to);
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Output Helper %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  const getOutput = (event) => {
    const newOutput = event.target.dataset.who.replaceAll(",", ", ");
    output = newOutput;
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  //JSX to display if event is still in the process of loading
  const eventLoading = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  //Determine which page should be displayed when event is loaded
  const eventLoaded = () => {
    if (page === "details") {
      return details()
    } else if (page === "attendance") {
      return attendance();
    } else {
      return rsvp();
    }
  }

  //Return EventDetails.js component with proper props
  const details = () => {
    return (
      <div>
        <EventDetails event={event} />
        <button onClick={togglePage} data-to="attendance">View Attendance</button>
        <button onClick={togglePage} data-to="rsvp">Sign Up!</button>
      </div>
    )
  }

  //Helper function to attendance
  const prepareBlocks = () => {
    const content = [];

    if (blocks.length > 0) {
      blocks.forEach((singleBlock, index) => {
        content.push(<AttendanceChart
          key={singleBlock[0]}
          className={"attendance-chart"}
          attending={event.attending}
          days={blocks[index]}
          early={event.early}
          late={event.late}
          block={index + 1} 
          getOutput={getOutput}
          />
        )
      });
    }

    return content;
  }

  //Return AttendanceChart.js component with proper props
  const attendance = () => {
    return (
      <>
        <button onClick={togglePage} data-to="details">Back</button>
        <p>{output}</p>
        {prepareBlocks()}
      </>
    )
  }

  //Return AttendForm.js component with proper props
  const rsvp = () => {
    return (
      <>
        <button onClick={togglePage} data-to="details">Back</button>
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