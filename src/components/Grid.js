//Dependencies
import { useState, React } from 'react';

//Styles
import '../styles/grid.scss';

const Grid = (props) => {

  let selection = false, selectionStart, selectionEnd, toggle;

  //Starts a selection and prevents page scrolling
  const handleMouseDown = e => {
    e.preventDefault();
    console.log(`running handleMouseDown on ${e.target}`);

    selection = true;
    selectionStart = e.target;
    selectionEnd = e.target;
    setToggle(e.target);
  }

  //Helper function - determines toggle state
  const setToggle = (target) => {
    if (target.className == "gridCell") {
      toggle = "gridCell gridSelected";
    } else {
      toggle = "gridCell";
    }
  }

  //Toggles mouseover cell's class according to mousedown's class
  const handleMouseOver = e => {
    console.log(`running handleMouseOver on ${e.target}`);
    if (selection) {
      e.target.className = toggle;
    }
  }

  //Ends a selection when mouse up
  const handleMouseUp = () => {
    console.log(`running handleMouseUp...`)
    if (selection) {
      selection = false
    }
  }

  return (
    <div className="gridTable">
      <div className="gridContents">
        <div id="1" className="gridColumn" data-column="1">
          <div id="1" data-column="1" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="2" data-column="1" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="3" data-column="1" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="4" data-column="1" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="5" data-column="1" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="6" data-column="1" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="7" data-column="1" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="8" data-column="1" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="9" data-column="1" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="10" data-column="1" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
        </div>
        <div id="2" className="gridColumn">
          <div id="1" data-column="2" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="2" data-column="2" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="3" data-column="2" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="4" data-column="2" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="5" data-column="2" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="6" data-column="2" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="7" data-column="2" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="8" data-column="2" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="9" data-column="2" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="10" data-column="2" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
        </div>
        <div id="3" className="gridColumn">
          <div id="1" data-column="3" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="2" data-column="3" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="3" data-column="3" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="4" data-column="3" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="5" data-column="3" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="6" data-column="3" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="7" data-column="3" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="8" data-column="3" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="9" data-column="3" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="10" data-column="3" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
        </div>
        <div id="4" className="gridColumn">
          <div id="1" data-column="4" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="2" data-column="4" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="3" data-column="4" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="4" data-column="4" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="5" data-column="4" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="6" data-column="4" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="7" data-column="4" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="8" data-column="4" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="9" data-column="4" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="10" data-column="4" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
        </div>
        <div id="5" className="gridColumn">
          <div id="1" data-column="5" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="2" data-column="5" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="3" data-column="5" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="4" data-column="5" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="5" data-column="5" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="6" data-column="5" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="7" data-column="5" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="8" data-column="5" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="9" data-column="5" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="10" data-column="5" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
        </div>
        <div id="6" className="gridColumn">
          <div id="1" data-column="6" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="2" data-column="6" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="3" data-column="6" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="4" data-column="6" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="5" data-column="6" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="6" data-column="6" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="7" data-column="6" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="8" data-column="6" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="9" data-column="6" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
          <div id="10" data-column="6" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
        </div>
      </div>
    </div>
  );
};

export default Grid;