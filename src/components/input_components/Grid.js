//Dependencies
import { React, useState, useEffect } from 'react';

//Styles
import '../../styles/input_styling/grid.scss';

const Grid = ({ early, late, days, block, handleAvailable, active }) => {

  /* ------------------------------------------ Grid Generator Functions & Variables ------------------------------------------ */

  //Get column and row numbers from props
  let numColumns = days.length;
  let numRows = Math.abs(late - early) * 2;

  //Adjust Cell Width and Height based on numRows & numColumns
  useEffect(() => {
    const columnWidth =  Math.floor(90 / (numColumns + 1));
    const cellHeight = Math.floor(90 / (numRows));

    document.getElementById("grid-wrapper").style.setProperty("--column-width", `${columnWidth}%`);
    document.getElementById("grid-wrapper").style.setProperty("--cell-height", `${cellHeight}%`);
  })

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%% Labels Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper functin (generateRowLabels) - generate the text for row labels
  const rowLabelHelper = (index) => {
    let label = null, moreHours = Math.floor(index / 2);
    let suffix = (early + moreHours) > 11 && (early + moreHours) < 24 ? "PM" : "AM";
    let base = (early + moreHours) > 12 ? (early + moreHours) - 12 : early + moreHours;
    if (index % 2 === 0) {
      label = <p className="rowLabelText">{`${base}:00 ${suffix}`}</p>
    } else {
      label = <p className="rowLabelText">{`${base}:30 ${suffix}`}</p>
    }
    return label;
  }

  //Helper function (generatecolumnLabels) - generate the text for column labels
  const columnLabelHelper = (index) => {
    let label = null;
    if (index !== 0) {
      const day = new Date(days[index - 1]);
      let text = day.toDateString().substring(0, 10);
      label = <p className="columnLabelText">{text}</p>
    }
    return label;
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Labels %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Generator function - labels for rows
  const generateRowLabels = (rows) => {
    let content = [], label = null;

    //Generate an array of row labels
    for (let i = 0; i <= numRows; i++) {
      label = rowLabelHelper(i);
      content.push(
        <div key={`${i}`} data-row={i} className="rowLabelCell">
          {label}
        </div>
      )
    }

    //Return the array of row labels we made above wrapped inside a container div
    return (
      <div key={"rowLabels"} id="row-labels">
        {content}
      </div>
    )
  }

  //Generator function - labels for columns
  const generateColumnLabels = () => {
    let content = [], label = null;

    //Generate an array of column labels
    for (let i = 0; i <= numColumns; i++) {
      if (days[i - 1] !== null) {
        label = columnLabelHelper(i)
        content.push(
          <div key={`${i}`} data-column={i} className="columnLabelCell">
            {label}
          </div>
        )
      } else {
        content.push(
          <div key={`${i}`} data-column={i} className="columnLabelCell empty">
          </div>
        )
      }
    }

    //Return the array of column labels we made above wrapped inside a container div
    return (
      <div key={"columnLabels"} id="column-labels">
        {content}
      </div>
    )
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Grid %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Generator function - rows within a column
  const generateRows = (column, empty = false) => {
    let content = []
    for (let i = 1; i <= numRows; i++) {

      //Generate highlighted cells according to passed active array
      if (!empty && active.find(cell => cell[1] === column && cell[2] === i)) {
        content.push(
          <div key={`${i}`} data-block={block} data-column={column} data-row={i} className="gridCell gridSelected" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}>
          </div>
        )
      //Generate a normal cell
      } else if (!empty) {
        content.push(
          <div key={`${i}`} data-block={block} data-column={column} data-row={i} className="gridCell" onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onMouseUp={handleMouseUp}>
          </div>
        )
      //Generate an invisible empty cell
      } else {
        content.push(
          <div key={`${i}`} data-block={block} data-column={column} data-row={i} className="gridCell empty">
          </div>
        )
      }
    }
    return content
  }

  //Main generator function - generates the columns of a grid
  const generateColumns = () => {
    let content = []
    content.push(generateRowLabels());

    for (let i = 1; i <= numColumns; i++) {
      //If the column's corresponding date is not null
      if (days[i - 1] !== null) {
        content.push(
          <div key={`${i}`} data-block={block} data-column={i} data-time={days[i-1]} className="gridColumn">
            {generateRows(i)}
          </div>
        )
      //If the column should represent a null date (empty column)
      } else {
        content.push(
          <div key={`${i}`} data-block={block} data-column={i} className="gridColumn emptyColumn">
            {generateRows(i, true)}
          </div>
        )
      }
    }
    return content
  }

  /* ------------------------------------------ Selection Event Variables ------------------------------------------ */

  //Component wide variables
  const [selectedCells, setSelectedCells] = useState([]);

  let selection = false; //Tracks if there is a selection occuring
  let selectionStart; //Trakcs where the selection began from
  let selectionEnd; //Tracks where the selection is ending
  let toggleState = true; //Tracks if the gridSelected class should be added or removed

  /* ------------------------------------------ Selection Event Helper Functions ------------------------------------------ */

  //Helper function (handleMouseDown) - determines toggle state
  const setToggleState = target => {
    if (target.className === "gridCell") {
      toggleState = true;
    } else {
      toggleState = false;
    }
  }

  //Helper function (handleMouseDown, handleMouseover) - toggles the provided elements' class according to toggleState and manages
  //adding or removing the cell from selectedCells state
  const toggleThis = (toggleWhat) => {
    if (toggleState) {
      toggleWhat.forEach((element) => {
        element.classList.add("gridSelected");
        addToSelectedCells(Number(element.dataset.column), Number(element.dataset.row));
      });
    } else {
      toggleWhat.forEach((element) => {
        element.classList.remove("gridSelected");
        removeFromSelectedCells(Number(element.dataset.column), Number(element.dataset.row));
      });
    }
  }

  //Helper function (toggleThis) - add to selectedCells under the right conditions
  const addToSelectedCells = (column, row) => {
    const item = [block, column, row];

    if (selectedCells.length === 0 || searchSelectedCells(item) === null) {
      // console.log(`Adding (${block}, ${column}, ${row}) to selectedCells`);
      const newCells = selectedCells;
      newCells.push(item);
      newCells.sort();
      setSelectedCells(newCells);
    }
  }

  //Helper function (toggleThis) - remove from selectedCells under the right conditions
  const removeFromSelectedCells = (column, row) => {
    const item = [block, column, row];
    const index = searchSelectedCells(item);

    if (index !== null) {
      // console.log(`Removing (${block}, ${column}, ${row}) from selectedCells`);
      const newCells = selectedCells; newCells.splice(index, 1);
      setSelectedCells(newCells);
    }
  }

  /* Helper function (addToSelectedCells, removeFromSelectedCells) - search through selectedCells and return
  null if no element exists - otherwise returns index of the element being searched for */
  const searchSelectedCells = (item) => {
    let exists = null;

    selectedCells.forEach((cell, index) => {
      if (cell[0] === item[0] && cell[1] === item[1] && cell[2] === item[2]) {
        exists = index;
      }
    })

    return exists;
  }

  //Helper function (handleMouseOver) - determines what square should be passed to toggleThis
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
    
    return sizeArray;
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Handler function - Start a selection and toggle mousedown target
  const handleMouseDown = e => {
    //Prevent page scrolling
    e.preventDefault();

    //Console message
    // console.log(`Starting at (${block}, ${e.target.dataset.column}, ${e.target.dataset.row})...`);

    //Set component wide variables that track a selection
    selection = true;
    selectionStart = e.target;
    selectionEnd = e.target;
    setToggleState(e.target);
    toggleThis([e.target]);
  }

  //Handler function - Determine which cells to toggle based on mouseover
  const handleMouseOver = e => {
    if (selection) {
      //Console message
      // console.log(`Mouse over at (${block}, ${e.target.dataset.column}, ${e.target.dataset.row})...`);

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

        toggleThis(toggleWhat);
      }
    }
  }

  //Handler function - ends a selection when mouse up or cursor moves out of grid
  const handleMouseUp = () => {
    // console.log(`Stopping selection...`);
    selection = false
    // console.log("sending selected cells to AttendForm.js:");
    // console.log(selectedCells);
    handleAvailable(selectedCells, block);
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="grid-wrapper">
      {generateColumnLabels()}
      <div id="grid-contents" onMouseLeave={selection ? handleMouseUp() : null}>
        {generateColumns()}
      </div>
    </div>
  );
};

export default Grid;