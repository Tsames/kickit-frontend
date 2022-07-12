//Dependencies
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiUsers, FiNavigation } from "react-icons/fi";

//Import Components
import AttendanceChart from "../display_components/AttendanceChart";
import EventDetails from "../display_components/EventDetails";
import AttendForm from "./AttendForm";
import DetailsToAttendance from '../transition_components/DetailsToAttendance';
import AttendanceToDetails from '../transition_components/AttendanceToDetails';

//Styling
import '../../styles/form_styling/attend_form.scss';

const ViewEvent = ({ setRoot }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const REDIRECT_URL = "/share/" + id;
  setRoot("rb-view-event");

  //States to keep track of the component that is displayed
  const [page, setPage] = useState("details");

  /* %%%%%%%%%%%%%%%% Attendance Page Specific States %%%%%%%%%%%%%%%% */

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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Page State Helper %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper function that sends the page to attendance or rsvp with animation
  const handleNavigate = (event) => {
    const transitionLeft = document.getElementById("dta-transition-left");
    const transitionRight = document.getElementById("dta-transition-right");

    transitionLeft.className = "dta-transition-left-move";
    transitionRight.className = "dta-transition-right-move";
    setTimeout(() => {
      setPage(event.target.dataset.to);
    }, 2000)
  }

  //Helper function that returns the page to details from attendance or rsvp with animation
  const handleReturn = (event) => {
    const transitionBack = document.getElementById("atdTransition");

    transitionBack.className = "atd-transition-move";
    setTimeout(() => {
      setPage(event.target.dataset.to);
    }, 1000)
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

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //JSX to display if event is still in the process of loading
  const eventLoading = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  //Helper to attendance
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

  //Helper to attendance
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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Main Pages %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Details
  const details = () => {
    return (
      <div id="details-main">
        <DetailsToAttendance />
        <div id="details-left">
          <EventDetails event={event} />
        </div>
        <div id="details-right">
          <button className="details-button" onClick={handleNavigate} data-to="rsvp">Sign Up!</button>
          <button className="details-button" onClick={handleNavigate} data-to="attendance">View Attendance</button>
        </div>
      </div>
    )
  }

  //Attendance
  const attendance = () => {
    return (
      <div id="attendance-main">
        <AttendanceToDetails />
        <div id="attendance-left">
          <div id="attendance-modes">
            <p><button id="all-button" className="mode-button" onClick={() => setMode(true)}><FiUsers></FiUsers></button>
             | <button id="mouseover-button" className="mode-button" onClick={() => setMode(false)}><FiNavigation></FiNavigation></button></p>
          </div>
          <h4>{mode ? "All Attending" : "Mouseover"}</h4>
          <div id="attendance-list-wrapper">
              {prepareListItems()}
          </div>
          <button id="attendance-back" onClick={handleReturn} data-to="details">Back</button>
        </div>
        <div id="attendance-right">
          {prepareBlocks()}
        </div>
      </div>
    )
  }

  //Rsvp
  const rsvp = () => {
    return (
      <div id="rsvp-main">
        <AttendanceToDetails />
        <AttendForm URL={URL} event={event} blocks={blocks} togglePage={handleReturn}/>
      </div>
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