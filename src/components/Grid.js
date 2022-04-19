//Dependencies
import { React } from 'react';

//Styles
import '../styles/grid.scss';

const Grid = ({early, late, days, blocks}) => {

  /* ------------------------------------------ Grid Generator ------------------------------------------*/

  //Get column and row numbers from props
  let numColumns = days;
  let numRows = Math.abs(late - early) * 2;

  //Helper function - generates the rows within a column
  const generateRows = (column) => {
    let content = []
    for (let i = 1; i <= numRows; i++) {
      content.push(
        <div key={`${column}, ${i}`} data-column={column} data-row={i} className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}></div>
      )
    }
    return content
  }

  //Main generator function that generates the columns of a grid
  const generateColumns = () => {
    let content = []
    for (let i = 1; i <= numColumns; i++) {
      content.push(
        <div key={`c${i}`} data-column={i} className="gridColumn">
          {generateRows(i)}
        </div>
      )
    }
    return content
  }

  /* ------------------------------------------ Selection Events & Logic ------------------------------------------*/

  //Component wide variables
  let selection = false; //Tracks if there is a selection occuring
  let selectionStart; //Trakcs where the selection began from
  let selectionEnd; //Tracks where the selection is ending
  let toggleState = true; //Tracks if the gridSelected class should be added or removed

  const cellOn = "gridCell gridSelected"; //The class that highlights a cell
  const cellOff = "gridCell"; //The class for an unhighlighted cell

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
    toggleThis([e.target]);
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
    if (toggleState) {
      toggleWhat.forEach((element) => {
        element.className = cellOn;
      });
    } else {
      toggleWhat.forEach((element) => {
        element.className = cellOff;
      });
    }
  }

  //Helper function - determines if start or end is the bigger number
  const getCorners = () => {

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
      const sizeArray = getCorners();
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

        //Grab all selected column nodes
        const selectedColumns = Array.from(selectionEnd.parentElement.parentNode.childNodes).filter(child => 
          (smallColumn <= Number(child.dataset.column) && Number(child.dataset.column) <= bigColumn)
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
      selection = false
    }
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div className="gridTable">
      <div className="gridContents">
        {generateColumns()}
      </div>
    </div>
  );
};

export default Grid;