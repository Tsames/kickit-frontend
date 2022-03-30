//Dependencies
import { useState, React } from 'react';

//Styles
import '../styles/grid.scss';

const Grid = (props) => {

  //Declare Helper Variables
  let selection = false;
  let selectionStart;
  let selectionEnd;
  let toggle;

  //Run on MouseDown - starts a selection sets a new start and end to the selection.
  const startSelection = (e) => {
    //prevent page scrolling
    e.preventDefault();

    //set/reset helper variables
    selection = true;
    getToggle(e.target);
    selectionStart = e.target;
    selectionEnd = e.target;
    processSelection()
  }

  //Helper Function - determines if class should be added or removed
  const getToggle = (target) => {
    if (target.className == "gridCell gridSelected") {
      toggle = "gridCell";
    } else {
      toggle = "gridCell gridSelected";
    }
  }

  //Run on Mouseover - sets new end of selection and runs helper
  const dragSelection = (e) => {
    e.preventDefault();
    if (selection) {
      selectionEnd = e.target;
      processSelection()
    }
  }

  //Helper Function - removes/adds class from selection start to selection end and all inbetween
  const processSelection = () => {
    if(selectionStart.dataset.column == selectionEnd.dataset.column) {
      let nodes = selectionEnd.parentElement.childNodes;
      const indexStart = selectionStart.dataset.row - 1;
      const indexEnd = selectionEnd.dataset.row - 1;
      for (let i=indexStart; i <= indexEnd; i++) {
        nodes[i].className = toggle;
      }
    }
  }

  //Runs on MouseUp - ends selection
  const endSelection = (e) => {
    selection = false;
  }

  return (
    <div className="gridTable">
      <div className="gridContents">
        <div id="1" className="gridColumn" data-column="1">
          <div id="1" data-column="1" data-row="1" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="2" data-column="1" data-row="2" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="3" data-column="1" data-row="3" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="4" data-column="1" data-row="4" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="5" data-column="1" data-row="5" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="6" data-column="1" data-row="6" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="7" data-column="1" data-row="7" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="8" data-column="1" data-row="8" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="9" data-column="1" data-row="9" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="10" data-column="1" data-row="10" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
        </div>
        <div id="2" className="gridColumn">
          <div id="11" data-column="2" data-row="1" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="12" data-column="2" data-row="2" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="13" data-column="2" data-row="3" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="14" data-column="2" data-row="4" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="15" data-column="2" data-row="5" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="16" data-column="2" data-row="6" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="17" data-column="2" data-row="7" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="18" data-column="2" data-row="8" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="19" data-column="2" data-row="9" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="20" data-column="2" data-row="10" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
        </div>
        <div id="3" className="gridColumn">
          <div id="21" data-column="3" data-row="1" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="22" data-column="3" data-row="2" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="23" data-column="3" data-row="3" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="24" data-column="3" data-row="4" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="25" data-column="3" data-row="5" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="26" data-column="3" data-row="6" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="27" data-column="3" data-row="7" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="28" data-column="3" data-row="8" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="29" data-column="3" data-row="9" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="30" data-column="3" data-row="10" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
        </div>
        <div id="4" className="gridColumn">
          <div id="31" data-column="4" data-row="1" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="32" data-column="4" data-row="2" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="33" data-column="4" data-row="3" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="34" data-column="4" data-row="4" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="35" data-column="4" data-row="5" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="36" data-column="4" data-row="6" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="37" data-column="4" data-row="7" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="38" data-column="4" data-row="8" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="39" data-column="4" data-row="9" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="40" data-column="4" data-row="10" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
        </div>
        <div id="5" className="gridColumn">
          <div id="41" data-column="5" data-row="1" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="42" data-column="5" data-row="2" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="43" data-column="5" data-row="3" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="44" data-column="5" data-row="4" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="45" data-column="5" data-row="5" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="46" data-column="5" data-row="6" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="47" data-column="5" data-row="7" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="48" data-column="5" data-row="8" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="49" data-column="5" data-row="9" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="50" data-column="5" data-row="10" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
        </div>
        <div id="6" className="gridColumn">
          <div id="51" data-column="6" data-row="1" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="52" data-column="6" data-row="2" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="53" data-column="6" data-row="3" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="54" data-column="6" data-row="4" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="55" data-column="6" data-row="5" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="56" data-column="6" data-row="6" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="57" data-column="6" data-row="7" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="58" data-column="6" data-row="8" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="59" data-column="6" data-row="9" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
          <div id="60" data-column="6" data-row="10" data-time="" className="gridCell" onMouseDown={startSelection} onMouseOver={dragSelection} onMouseUp={endSelection}></div>
        </div>
      </div>
    </div>
  );
};

export default Grid;