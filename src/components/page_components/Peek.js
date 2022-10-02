//Dependencies
import { React, useState } from 'react';
import { FiUsers, FiNavigation } from "react-icons/fi";

//Import Components
import AttendanceChart from "../display_components/AttendanceChart";

//Styling
import '../../styles/page_styling/peek.scss';

const Peek = ({ event, blocks }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  /* %%%%%%%%%%%%%%%%% States That Manage Peek's Features %%%%%%%%%%%%%%%%% */

  //Stores data to determine the mode for interacting with the Availability Chart component (All Attending or Mouseover).
  const [mode, setMode] = useState("all");

  //Mouseover mode - stores the names of the attendees that are available in the cell that the mouse is over.
  const [output, setOutput] = useState([]);

  /* All Attending mode - Stores data that allows the grid to highlight one person's availability when clicked.

  -The active property keeps track of whether there is a limit active, and thus whether or not the Availability Chart should be filtered.
  -The name property is used in the Availability Chart as a condition for each cell.
  -The active property is used to keep track of the previous button that was pressed so that we can remove the previous filter. */
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

  /* Handler function - Mouseover Mode - passed to the Attendance Chart so that a cell within the chart that is hovered on
  will change the output variable in this component */
  const handleHover = (event) => {
    const newOutput = event.target.dataset.who.split(",");
    setOutput(newOutput);
  }

  //Handler function - All Attending Mode - resposible for toggling selecting individuals on the list.
  const handlePersonClick = (event) => {

    const target = event.target;
    const name = target.dataset.name;

    if (limit.active && name === limit.name) {

      target.classList.remove("limit-active");
      noLimit();

    } else if (limit.active) {

      activateLimit(name, target);
      if (limit.node !== null) {
        limit.node.classList.remove("limit-active");
      }
      target.classList.add("limit-active");

    } else {

      target.classList.add("limit-active");
      activateLimit(name, target);

    }
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
    if (mode === "all") {
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


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="peek-main">
      <div id="peek-modes">
        <h4>{mode === "all" ? "All Attending" : "Mouseover"}</h4>
        <button id="all-button" className="mode-button" onClick={() => setMode("all")}><FiUsers></FiUsers></button>
        <button id="mouseover-button" className="mode-button" onClick={() => setMode("mouse")}><FiNavigation></FiNavigation></button>
      </div>
      <div id="peek-list">
        {prepareListItems()}
      </div>
      <div id="peek-blocks">
        {prepareBlocks()}
      </div>
    </div>
  )
}

export default Peek;