//Dependencies
import { useState, React } from 'react';

//Styles
import '../styles/grid.scss';

const Grid = (props) => {
  //Component wide variables
  let selection = false; //Tracks if there is a selection occuring
  let selectionStart; //Trakcs where the selection began from
  let selectionEnd; //Tracks where the selection is ending
  let toggleState = true; //Tracks if the gridSelected class should be added or removed
  let selectedCells = [] //Tracks the cells that are being selected

  const cellOn = "gridCell gridSelected";
  const cellOff = "gridCell";

  //Starts a selection and prevents page scrolling
  const handleMouseDown = e => {
    //Prevent page scrolling
    e.preventDefault();

    //Console message
    console.log(`Starting at Column: ${e.target.dataset.column} - Row: ${e.target.dataset.row}...`);
    console.log(e);

    //Set component wide variables that track a selection
    selection = true;
    selectionStart = e.target;
    selectionEnd = e.target;
    setToggleState(e.target);
    addCells([e.target]);
  }

  //Helper function - determines toggle state
  const setToggleState = target => {
    //Sets toggleState to true if the selected cell is not colored upon mousedown
    if (target.className === cellOff) {
      toggleState = true;
    //Sets toggleState to false if the selected cell is already colored upon md
    } else {
      toggleState = false;
    }
  }

  //Helper function - adds array of cells individually to selectedCells array
  const addCells = cells => {
    cells.forEach((element) => {
      console.log(`Adding ${element.dataset.column}, ${element.dataset.row} to selection.`)
      selectedCells.push(element)
    })
    toggleThis();
  }

  //Helper function - removes array of cells individually from selectedCells array
  const removeCells = cells => {
    cells.forEach((element) => {
      const idx = selectedCells.findIndex((cell) => {return cell === element});
      if (idx) {
        console.log(`Removing ${element.dataset.column}, ${element.dataset.row} from selection.`)
        toggleThis(element, false);
        selectedCells.splice(idx, 1)
      }
    })
  }

  //Helper function - toggles the provided elements' class off
  const toggleThis = (toggleWhat = selectedCells, added = true) => {
    if (added) {
      toggleWhat.forEach((element) => {
        if (toggleState) {
          element.className = cellOn;
        } else {
          element.className = cellOff;
        }
      });
    } else {
      if (toggleState) {
        toggleWhat.className = cellOff;
      } else {
        toggleWhat.className = cellOn;
      }
    }
  }

  //Determine which cells to toggle based on selection
  const handleMouseOver = e => {
    //Only run the function if a selection is currently active
    if (selection) {

      //Console message
      console.log(`running at Column: ${e.target.dataset.column} - Row: ${e.target.dataset.row}...`);

      //Set new end
      selectionEnd = e.target;

      //Set helper variables
      let startColumn = Number(selectionStart.dataset.column);
      let startRow = Number(selectionStart.dataset.row);
      let endColumn = Number(selectionEnd.dataset.column);
      let endRow = Number(selectionEnd.dataset.row);

      //----- Adding Cells -----
      if ((toggleState && e.target.className === cellOff) || (!toggleState && e.target.className === cellOn)){
        //If the end is in the same column
        if (startColumn === endColumn) {
          //Create sliced array from child node list of parent element
          let fillArray = Array.from(selectionEnd.parentElement.childNodes).filter(child => 
            (startRow <= Number(child.dataset.row) && Number(child.dataset.row) <= endRow));
          console.log(fillArray);
          addCells(fillArray);
        //Else the selection spans columns
        } else {
          return
        }
       //----- Removing Cells -----
      } else {
        removeCells([e.target]);
      }
    }
  }

  //Ends a selection when mouse up
  const handleMouseUp = () => {
    console.log(`Stopping selection...`)
    if (selection) {
      selectedCells = []
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