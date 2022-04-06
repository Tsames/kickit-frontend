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
  // let selectedCells = [] //Tracks the cells that are being selected

  const cellOn = "gridCell gridSelected"; //The class that highlights a cell
  const cellOff = "gridCell"; //The class for a normal cell

  const handleMouseDown = e => {
    //Prevent page scrolling
    e.preventDefault();

    //Console message
    console.log(`Starting at (${e.target.dataset.column}, ${e.target.dataset.row})...`);

    //Set component wide variables that track a selection
    selection = true;
    selectionStart = e.target;
    selectionEnd = e.target;
    setToggleState(e.target);
  }

  //Helper function - determines toggle state
  const setToggleState = target => {
    if (target.className === cellOff) {
      toggleState = true;
    } else {
      toggleState = false;
    }
  }

  //Helper function - toggles the provided elements' class according to toggleState
  const toggleThis = (toggleWhat) => {
    toggleWhat.forEach((element) => {
      if (toggleState) {
        element.className = cellOn;
      } else {
        element.className = cellOff;
      }
    });
  }

  //Helper function - determines if start or end is the bigger number
  const findShape = () => {

    //Set helper variables
    const startColumn = Number(selectionStart.dataset.column);
    const startRow = Number(selectionStart.dataset.row);
    const endColumn = Number(selectionEnd.dataset.column);
    const endRow = Number(selectionEnd.dataset.row);

    //Create return object
    const sizeArray = [];

    //Push to return object in order of smallest row to largest column
    //Rows
    if (startRow >= endRow) {
      sizeArray.push(endRow);
      sizeArray.push(startRow);
    } else {
      sizeArray.push(startRow);
      sizeArray.push(endRow);
    }

    //Columns
    if (startColumn >= endColumn) {
      sizeArray.push(endColumn);
      sizeArray.push(startColumn);
    } else {
      sizeArray.push(startColumn);
      sizeArray.push(endColumn);
    }
    console.log(`Endpoints are from (${sizeArray[2]}, ${sizeArray[0]}) to (${sizeArray[3]}, ${sizeArray[1]})`);
    return sizeArray;
  }

  //Determine which cells to toggle based on selection
  const handleMouseOver = e => {
    if (selection) {
      //Console message
      console.log(`Mouse over at (${e.target.dataset.column}, ${e.target.dataset.row})...`);

      //Set new end
      selectionEnd = e.target;

      //Set toggle points
      const sizeArray = findShape();
      const smallRow = sizeArray[0], bigRow = sizeArray[1], smallColumn = sizeArray[2], bigColumn = sizeArray[3];

      //If the selection is restricted to a single column
      if (smallColumn === bigColumn) {

        //Create sliced array from child node list of parent element
        let fillArray = Array.from(selectionEnd.parentElement.childNodes).filter(child => 
          (smallRow <= Number(child.dataset.row) && Number(child.dataset.row) <=bigRow)
        );
        console.log(`Toggling the contents of: `);
        console.log(fillArray);
        toggleThis(fillArray);

      //Else the selection spans columns
      } else {

        //Create a new array to send to helper
        const toggleWhat = [];
        const selectedColumns = Array.from(selectionEnd.parentElement.parentNode.childNodes).filter(child => 
          (smallColumn <= Number(child.id) && Number(child.id) <= bigColumn)
        );
        
        //Find all the cells in selected columns that are within the selected rows
        selectedColumns.forEach(column => {
          const columnCells = Array.from(column.childNodes);
          columnCells.forEach(cell => {
            const cellNumber = Number(cell.dataset.row);
            if (smallRow <= cellNumber && cellNumber <= bigRow) {
              toggleWhat.push(cell)
            }
          })
        })

        console.log(`Toggling the contents of: `);
        console.log(toggleWhat);
        toggleThis(toggleWhat);
      }
    }
  }

  //Ends a selection when mouse up
  const handleMouseUp = () => {
    console.log(`Stopping selection...`)
    if (selection) {
      // selectedCells = []
      selection = false
    }
  }

  return (
    <div className="gridTable">
      <div className="gridContents">
        <div id="1" className="gridColumn">
          <div id="1" data-column="1" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="2" data-column="1" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="3" data-column="1" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="4" data-column="1" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="5" data-column="1" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="6" data-column="1" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="7" data-column="1" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="8" data-column="1" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="9" data-column="1" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="10" data-column="1" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
        </div>
        <div id="2" className="gridColumn">
          <div id="1" data-column="2" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="2" data-column="2" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="3" data-column="2" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="4" data-column="2" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="5" data-column="2" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="6" data-column="2" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="7" data-column="2" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="8" data-column="2" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="9" data-column="2" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="10" data-column="2" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
        </div>
        <div id="3" className="gridColumn">
          <div id="1" data-column="3" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="2" data-column="3" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="3" data-column="3" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="4" data-column="3" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="5" data-column="3" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="6" data-column="3" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="7" data-column="3" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="8" data-column="3" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="9" data-column="3" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="10" data-column="3" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
        </div>
        <div id="4" className="gridColumn">
          <div id="1" data-column="4" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="2" data-column="4" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="3" data-column="4" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="4" data-column="4" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="5" data-column="4" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="6" data-column="4" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="7" data-column="4" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="8" data-column="4" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="9" data-column="4" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="10" data-column="4" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
        </div>
        <div id="5" className="gridColumn">
          <div id="1" data-column="5" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="2" data-column="5" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="3" data-column="5" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="4" data-column="5" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="5" data-column="5" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="6" data-column="5" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="7" data-column="5" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="8" data-column="5" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="9" data-column="5" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="10" data-column="5" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
        </div>
        <div id="6" className="gridColumn">
          <div id="1" data-column="6" data-row="1" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="2" data-column="6" data-row="2" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="3" data-column="6" data-row="3" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="4" data-column="6" data-row="4" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="5" data-column="6" data-row="5" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="6" data-column="6" data-row="6" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="7" data-column="6" data-row="7" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="8" data-column="6" data-row="8" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="9" data-column="6" data-row="9" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
          <div id="10" data-column="6" data-row="10" className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseOver} onTouchEnd={handleMouseUp}></div>
        </div>
      </div>
    </div>
  );
};

export default Grid;