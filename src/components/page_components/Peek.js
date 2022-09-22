//Dependencies
import { React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUsers, FiNavigation } from "react-icons/fi";

//Import Components
import AttendanceChart from "../display_components/AttendanceChart";
import GridsToShare from '../transition_components/GridsToShare';

//Styling
import '../../styles/page_styling/peek.scss';

const Peek = ({ getEventData, event, blocks }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //Get Id from params
  const id = useParams().id;

  /* If the event stored in state does not have the same id as the id in params then call
  getEventData from App.js and get the data of the event that matches the id in params */
  if (event === null || id !== event._id) {
    getEventData(id);
  }

  /* %%%%%%%%%%%%%%%%% States That Manage Peek's Features %%%%%%%%%%%%%%%%% */

  //Stores data to determine the mode for display (All Attending or Mouseover)
  const [mode, setMode] = useState(true);

  //Stores data for Mouseover mode
  const [output, setOutput] = useState([]);

  //Stores data for All Attending mode
  const [limit, setLimit] = useState({
    name: "",
    node: null,
    active: false
  })

  /* ------------------------------------------ Event Handler Helper Functions ------------------------------------------ */

  /* Helper function (handlePersonClick) - in the case that a new person is clicked sets
  the limit state to the appropriate values */
  const activateLimit = (newName, newNode) => {
    const newLimit = {
      name: newName,
      node: newNode,
      active: true
    }
    setLimit(newLimit);
  }

  //Helper function (handlePersonClick) - sets limit to inactive
  const noLimit = () => {
    setLimit({ ...limit, active: false });
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  /*Handler function - passed to the Attendance Chart so that a cell within the chart that is hovered on
  will change the output variable in this component */
  const handleHover = (event) => {
    const newOutput = event.target.dataset.who.split(",");
    setOutput(newOutput);
  }

  //Handler function - resposible for toggling selecting individuals on the list that accompanies the attendance chart
  const handlePersonClick = (event) => {

    const target = event.target;
    const name = target.dataset.name;

    if (limit.active && name === limit.name) {
      target.className = "peek-list-person";
      noLimit();
    } else if (limit.active) {
      activateLimit(name, target);
      if (limit.node !== null) {
        limit.node.className = "peek-list-person"
      }
      target.className = "peek-list-person limit-active"
    } else {
      target.className = "peek-list-person limit-active"
      activateLimit(name, target);
    }
  }

  //Handler function - returns the page to Share.js with animation
  const handleReturn = (event) => {
    const transitionBack = document.getElementById("grids-to-share-transition");

    transitionBack.className = "grids-to-share-transition-move";
    setTimeout(() => {
      navigate(`/share/${id}`);
    }, 1000)
  }

  /* ------------------------------------------ Conditional JSX Helpers ------------------------------------------ */

  //Helper function (peek) - creates an array of attendance charts, one for each block
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

  /* Helper function (peek) - create a listing for each person attending the event for both all attending
  and mouseover modes */
  const prepareListItems = () => {
    const content = [];
    if (mode) {
      event.attending.forEach((person, index) => {
        content.push(<button key={index} className="peek-list-person" data-name={person.name} onClick={handlePersonClick}>{person.name}</button>);
      })
    } else {
      output.forEach((person, index) => {
        content.push(<p key={index} className="peek-list-person">{person}</p>);
      })
    }

    return content;
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  //JSX to display if event is still in the process of loading
  const noEvent = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  //Main JSX
  const peek = () => {
    return (
      <div id="peek-main">
        <GridsToShare />
        <div id="peek-left">
          <div id="peek-modes">
            <p><button id="all-button" className="mode-button" onClick={() => setMode(true)}><FiUsers></FiUsers></button>
              | <button id="mouseover-button" className="mode-button" onClick={() => setMode(false)}><FiNavigation></FiNavigation></button></p>
          </div>
          <h4>{mode ? "All Attending" : "Mouseover"}</h4>
          <div id="peek-list-wrapper">
            {prepareListItems()}
          </div>
          <button id="peek-back" onClick={handleReturn} data-to="details">Back</button>
        </div>
        <div id="peek-right">
          {prepareBlocks()}
        </div>
      </div>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="peek-wrapper" className="page-body">
      {event === null ? noEvent() : peek()}
    </div>
  )
}

export default Peek;