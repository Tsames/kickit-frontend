//Dependencies
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiUsers, FiNavigation } from "react-icons/fi";

//Import Components
import AttendanceChart from "../display_components/AttendanceChart";
import EventDetails from "../display_components/EventDetails";
import AttendForm from "../form_components/AttendForm";

//Styling
import '../../styles/form_styling/attend_form.scss';

const ViewEvent = ({ setRoot }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const id = useParams().id;
  const URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/" + id;
  setRoot("rb-view-event-attending");

  //Stores event data
  const [event, setEvent] = useState(null);

  //Stores data used to organize AttendanceChart.js and Grid.js
  const [blocks, setBlocks] = useState([]);

  //States to keep track of the component that is displayed
  const [page, setPage] = useState("attendance");

  /* %%%%%%%%%%%%%%%% Attendance Page Specific State %%%%%%%%%%%%%%%% */

  //Stores data from the AttendanceChart component to show who is coming at a particular time
  const [output, setOutput] = useState([]);

  //Stores data to determine the mode for Attendance Page
  const [mode, setMode] = useState(true);

  //Stores data to determine who to show in Attendance Chart
  const [limit, setLimit] = useState({
    name: "",
    node: null,
    active: false
  })

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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Output, Mode, and Limit State Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper function passed to the Attendance Chart so that a cell within the chart that is hovered on
  //will change the output variable in this component
  const handleHover = (event) => {
    const newOutput = event.target.dataset.who.split(",");
    setOutput(newOutput);
  }

  //Helper function resposible for toggling selecting individuals on the list that accompanies the attendance chart
  const handlePersonClick = (event) => {

    const target = event.target;
    const name = target.dataset.name;
    const siblings = target.parentNode.childNodes;

    if (limit.active && name === limit.name) {
      target.className = "attendance-list-person";
      noLimit();
    } else if (limit.active) {
      activateLimit(name, target);
      if (limit.node !== null) {
        limit.node.className = "attendance-list-person"
      }
      target.className = "attendance-list-person limit-active"
    } else {
      target.className = "attendance-list-person limit-active"
      activateLimit(name, target);
    }
  }

  //Helper to handlePersonClick
  const activateLimit = (newName, newNode) => {
    const newLimit = {
      name: newName,
      node: newNode,
      active: true
    }
    setLimit(newLimit);
  }

  //Helper to handlePersonClick
  const noLimit = () => {
    setLimit({...limit, active: false});
  }

  const changeMode = () => {

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
          handleHover={handleHover}
          limit={limit}
          />
        )
      });
    }

    return content;
  }

  const prepareListItems = () => {
    const content = [];
    if (mode) {
      event.attending.forEach((person, index) => {
        content.push(<button key={index} className="attendance-list-person" data-name={person.name} onClick={handlePersonClick}>{person.name}</button>);
      })
    } else {
      output.forEach((person, index) => {
        content.push(<p key={index} className="attendance-list-person">{person}</p>);
      })
    }

    return content;
  }

  //Return AttendanceChart.js component with proper props
  const attendance = () => {
    return (
      <div id="attendance-main">
        <div id="attendance-left">
          <div id="attendance-modes">
            <p><button id="all-attending-button" className="unbutton" onClick={() => setMode(true)}><FiUsers></FiUsers></button> | 
              <button id="mouseover-button" className="unbutton" onClick={() => setMode(false)}><FiNavigation></FiNavigation></button></p>
          </div>
          <h4>{mode ? "All Attending" : "Mouseover"}</h4>
          <div id="attendance-list-wrapper">
              {prepareListItems()}
          </div>
          <button onClick={togglePage} data-to="details">Back</button>
        </div>
        <div id="attendance-right">
          {/* <p>{limit.active ? `Viewing ${limit.name}'s availability` : null}</p> */}
          {prepareBlocks()}
        </div>
      </div>
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