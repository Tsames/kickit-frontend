//Dependencies
import React, { FC, useState, useEffect } from "react";
import { motion } from 'framer-motion';

//Styling
import './../../../../styles/events_styling/event_styling/child_components/availability.scss';

//Limit Interface
interface limitInterface {
    active: boolean;
    name: string;
}

//Attending Interface
interface attendingInterface {
    name: string;
    available: Array<[number, number]>;
}

//Event Interface
interface eventInterface {
    _id: string;
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
    attending: Array<attendingInterface>;
}

interface availabilityInterface {
    limit: limitInterface;
    eventData: eventInterface;
    selection: attendingInterface;
    setSelection: React.Dispatch<React.SetStateAction<attendingInterface>>
}

const Availability: FC<availabilityInterface> = ({ limit, eventData, selection, setSelection }) => {

  /* ------------------------------------------ Table Variables and State ------------------------------------------ */
  
  //Event Data
  const early = eventData.early;
  const late = eventData.late;
  const days = eventData.days
  const attending = eventData.attending;

  //Get column and row numbers from event data
  const numColumns = days.length;
  const numRows = Math.abs(late - early) * 2;

  //Selection Variables
  const [selectedCells, setSelectedCells] = useState([]);

  let selectionActive: boolean = false; //Tracks if there is a Active occuring
  let selectionStart: [number, number]; //Trakcs where the selection began from
  let selectionEnd: [number, number]; //Tracks where the selection is ending
  let selectionToggleState: boolean = true; //Tracks if the selected class should be added or removed

  //Adjust Cell Width and Height based on numRows & numColumns
  useEffect(() => {
    const columnWidth =  Math.floor(90 / (numColumns + 1));
    const cellHeight = Math.floor(90 / (numRows));

    const shell = document.getElementById("availability-shell") as HTMLDivElement;

    console.log(shell);

    shell.style.setProperty("--column-width", `${columnWidth}%`);
    shell.style.setProperty("--cell-height", `${cellHeight}%`);

    console.log('shell after:');
    console.log(shell);
  })

  /* ------------------------------------------ Framer Motion Variants ------------------------------------------ */

  //Hover
  const cellHover = {
    
  }

  /* ------------------------------------------ Table Generator Helpers ------------------------------------------ */

  //Helper function (generateColumnLabels) - generate the text for column labels
  const columnLabelHelper = (index: number) => {
    let label = null;

    if (index !== 0) {
      const day = new Date(days[index - 1]);
      let monthText = day.toDateString().substring(4, 10);
      let dotwText = day.toDateString().substring(0, 3);
      label = <>
        <p className="availability-column-label-text-one">{monthText}</p>
        <p className="availability-column-label-text-two">{dotwText}</p>
      </>
    }
    
    return label;
  }

  //Helper function (generateCells) - generate the text for row labels
  const rowLabelHelper = (rowIndex: number) => {
    let label = null, moreHours = Math.floor(rowIndex / 2);
    let suffix = (early + moreHours) > 11 && (early + moreHours) < 24 ? "PM" : "AM";
    let base = (early + moreHours) > 12 ? (early + moreHours) - 12 : early + moreHours;
    if (rowIndex % 2 === 0) {
      label = <p className="availability-row-label-text">{`${base}:00 ${suffix}`}</p>
    } else {
      label = <p className="availability-row-label-text">{`${base}:30 ${suffix}`}</p>
    }
    return label;
  }

  /* Helper function (generateCells) - gets an array of names of all attendees 
  who are available at that time */
  const determineWho = (column: number, row: number) => {
    const list: any=[];

    attending.forEach((person) => {
      person.available.every((time) => {
        //Search for the given cell for each person - if found move to next person.
        if (time[0] === column && time[1] === row) {
          list.push(person.name);
          list.sort();
          return false;
        } else {
          return true
        }
      })
    })

    return list;
  }

  /* Helper function (generateCells) - assigns cells a class that colors them based on the percentage
  of total attendees that reported they are available at the time this cell represents */
  const determineColor = (count: number) => {
    const totalCount = attending.length;
    const percentage = (count / totalCount) * 100;
    if (percentage >= 86) {
      return "everyoneAvailable";
    } else if (percentage >= 71) {
      return "alotAvailable";
    } else if (percentage >= 56) {
      return "manyAvailable";
    } else if (percentage >= 41) {
      return "someAvailable";
    } else if (percentage >= 26) {
      return "fewAvailable";
    } else if (percentage >= 11) {
      return "veryFewAvailable";
    } else {
      return "noneAvailable";
    }
  }

  //Helper function (generateCells) - assigns cells a class that colors them if limit is active
  const determineColorLimited = (whoAvailable :any) => {
    if (whoAvailable.includes(limit.name)) {
      return "everyoneAvailable";
    } else {
      return  "noneAvailable";
    }
  }

  /* ------------------------------------------ Table Generator Functions ------------------------------------------ */

    //Generator function - labels for columns
    const generateTableHeader = () => {
        let content = [], label = null;

        //Add the row label cell to the new row
        content.push(
            <td className="availability-row-label-cell" data-row={0} data-column={0}>
                {rowLabelHelper(0)}
            </td>
        )

        //Generate an array of column labels
        for (let i = 1; i <= numColumns; i++) {
            label = columnLabelHelper(i);
            content.push(
                <th key={`column-${i}-label`} className="availability-column-label-cell" data-row={0} data-column={i}>

                    {label}
                </th>
            )
        }

        //Return the array of column labels we made above wrapped inside a container div
        return (
            <tr id="availability-column-label-wrapper">
                {content}
            </tr>
        )
    }


  //Generator function - called by generateTable - generates each individual cell for a given row
  const generateCells = (row: number): Array<any> => {

    //Content Array will hold all the cell in the row
    let content = []

    //Add the row label cell to the new row
    content.push(
        <td className="availability-row-label-cell" data-row={row} data-column={0}>
            {rowLabelHelper(row)}
        </td>
    )

    //Iterate numColumns times and each time add a new cell to the content array
    for (let i = 1; i <= numColumns; i++) {

        //Attach attendees' names for those that are available at this time.
        const whoAvailable = determineWho(row, i);

        //Class that determines color of the cell assigned by helper functions based on whether or not a limit is active
        const whatColor = limit.active ? determineColorLimited(whoAvailable) : determineColor(whoAvailable.length);

        content.push(
          <motion.td 
          className={`availability-cell ${whatColor}`} 
          key={`cell-${i}`} 
          data-row={row} 
          data-column={i} 
          data-who={whoAvailable}
          whileHover={}>
          </motion.td>
        )
    }

    return content
  }

    //Main generator function - Generates the rows of the HTML table element
    const generateTable = (): Array<any> => {
        let content = []
        content.push(generateTableHeader());

        for (let i = 1; i <= numRows; i++) {

            //If the column's corresponding date is not null
            content.push(
                <tr id={`availability-row-${i}`} key={`${i}`} data-row={i} className="availability-row">
                    {generateCells(i)}
                </tr>
            );

        }

        return content
    }

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
    handleAvailable(selectedCells);
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="availability-shell">
      <table id="availability-contents">
        {generateTable()}
      </table>
    </div>
  )
}

export default Availability;