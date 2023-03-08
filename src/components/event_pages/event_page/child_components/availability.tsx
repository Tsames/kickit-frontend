//Dependencies
import React, { FC, useState, useEffect, useRef } from "react";
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

//Selection Interface
interface selectionInterface {
  name: string;
  available: Array<[number, number]>;
  mouse: Array<string>;
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
  selection: selectionInterface;
  setSelection: React.Dispatch<React.SetStateAction<selectionInterface>>;
}

const Availability: FC<availabilityInterface> = ({ limit, eventData, selection, setSelection }) => {

  /* ------------------------------------------ Table Variables and State ------------------------------------------ */
  
  //Event Data
  const early = eventData.early;
  const late = eventData.late;
  const days = eventData.days
  const attending = eventData.attending;

  //Selection Variables
  const [selectedCells, setSelectedCells] = useState<Array<[number, number]>>([]);

  //Greatest Number of Attendees
  const [mostPeople, setMostPeople] = useState(0);

  let selectionActive: boolean = false; //Tracks if there is a Active occuring
  let selectionStart: HTMLElement; //Trakcs where the selection began from
  let selectionEnd: HTMLElement; //Tracks where the selection is ending
  let selectionToggleState: boolean = true; //Tracks if the selected class should be added or removed

  //Get column and row numbers from event data
  const numColumns = days.length;
  const numRows = Math.abs(late - early) * 2;

  //Set useRef
  const tableBodyRef = useRef<null | HTMLDivElement>(null);

  //Adjust Cell Width and Height based on numRows & numColumns
  useEffect(() => {
    const columnWidth =  Math.floor(100 / (numColumns + 1));

    const shell = document.getElementById("availability-shell") as HTMLDivElement;

    if (numColumns < 3) {
      shell.style.setProperty("--rowLabelWidth", `20%`);
    } else {
      shell.style.setProperty("--rowLabelWidth", `${columnWidth}%`);
    }

    // console.log(shell);
    console.log(`setting --cellWidth to ${columnWidth}.`)
    console.log(shell.style);
    shell.style.setProperty("--cellWidth", `${columnWidth}%`);
    console.log(shell.style);

  }, [])

  /* ------------------------------------------ Framer Motion Variants ------------------------------------------ */

  //Hover
  const cellHover = {
    borderColor: "#e77474",
    transition: {
      duration: 0.1
    }
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

  //Helper Function (generateCells) - determines whether the text number should be displayed or not
  const determineNumber = () => {

  }

  /* ------------------------------------------ Table Generator Functions ------------------------------------------ */

  //Generator function - labels for columns
  const generateTableHeader = () => {
    let content = [], label = null;

    //Add the row label cell to the new row
    content.push(
      <div id="availability-top-row-label-cell" className="availability-row-label-cell" data-row={0} data-column={0}>
        {rowLabelHelper(0)}
      </div>
    )

    //Generate an array of column labels
    for (let i = 1; i <= numColumns; i++) {
      label = columnLabelHelper(i);
      content.push(
        <div key={`column-${i}-label`} className="availability-column-label-cell" data-row={0} data-column={i}>
          {label}
        </div>
      )
    }

    //Return the array of column labels we made above wrapped inside a container div
    return (
      <div id="availability-column-label-wrapper" className="availability-row" data-row={0}>
        {content}
      </div>
    )
  }


  //Generator function - called by generateTable - generates each individual cell for a given row
  const generateCells = (row: number): Array<any> => {

    //Content Array will hold all the cell in the row
    let content = []

    //Add the row label cell to the new row
    content.push(
      <div className="availability-row-label-cell" data-row={row} data-column={0}>
        {rowLabelHelper(row)}
      </div>
    )

    //Iterate numColumns times and each time add a new cell to the content array
    for (let i = 1; i <= numColumns; i++) {

        //Attach attendees' names for those that are available at this time.
        const whoAvailable = determineWho(row, i);
        if (whoAvailable.length > mostPeople) setMostPeople(whoAvailable.length);

        //Class that determines color of the cell assigned by helper functions based on whether or not a limit is active
        const whatColor = limit.active ? determineColorLimited(whoAvailable) : determineColor(whoAvailable.length);

        content.push(
          <motion.div 
          className={`availability-cell ${whatColor}`} 
          key={`cell-${i}`} 
          onMouseDown={handleMouseDown}
          onMouseOver={handleMouseOver}
          onMouseUp={handleMouseUp}
          data-row={row} 
          data-column={i} 
          data-who={whoAvailable}
          whileHover={cellHover}>
            <p className={whoAvailable.length >= mostPeople * 0.8  ? "availability-cell-text" : "availability-cell-text invisible"}>{whoAvailable.length}</p>
          </motion.div>
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
        <div id={`availability-row-${i}`} key={`${i}`} data-row={i} className="availability-row">
          {generateCells(i)}
        </div>
      );

    }

    return content
  }

  /* ------------------------------------------ Selection Event Helper Functions ------------------------------------------ */

  //Helper function (handleMouseDown) - determines toggle state
  const setToggleState = (target: HTMLElement) => {
    if (target.classList.contains("selected")) {
      selectionToggleState = false;
    } else {
      selectionToggleState = true;
    }
  }

  //Helper function (handleMouseDown, handleMouseover) - toggles the provided elements' class according to toggleState and manages
  //adding or removing the cell from selectedCells state
  const toggleThis = (toggleWhat: Array<HTMLElement>) => {
    if (selectionToggleState) {
      toggleWhat.forEach((element) => {
        element.classList.add("selected");
        addToSelectedCells(Number(element.dataset.column), Number(element.dataset.row));
      });
    } else {
      toggleWhat.forEach((element) => {
        element.classList.remove("selected");
        removeFromSelectedCells(Number(element.dataset.column), Number(element.dataset.row));
      });
    }
  }

  //Helper function (toggleThis) - add to selectedCells under the right conditions
  const addToSelectedCells = (column: number, row: number): void => {
    const item: [number, number] = [column, row];

    if (selectedCells.length === 0 || searchSelectedCells(item) === null) {
      // console.log(`Adding (${column}, ${row}) to selectedCells`);
      const newCells: Array<[number, number]> = selectedCells;
      newCells.push(item);
      newCells.sort();
      setSelectedCells(newCells);
    }
  }

  //Helper function (toggleThis) - remove from selectedCells under the right conditions
  const removeFromSelectedCells = (column: number, row: number): void => {
    const item: [number, number] = [column, row];
    const index = searchSelectedCells(item);

    if (index !== null) {
      // console.log(`Removing (${column}, ${row}) from selectedCells`);
      const newCells: Array<[number, number]> = selectedCells; newCells.splice(index, 1);
      setSelectedCells(newCells);
    }
  }

  /* Helper function (addToSelectedCells, removeFromSelectedCells) - search through selectedCells and return
  null if no element exists - otherwise returns index of the element being searched for */
  const searchSelectedCells = (item: [number, number]) => {
    let exists = null;

    selectedCells.forEach((cell, index) => {
      if (cell[0] === item[0] && cell[1] === item[1]) {
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
  const handleMouseDown = (e: React.BaseSyntheticEvent) => {
    //Prevent page scrolling
    e.preventDefault();

    e.target as HTMLElement;
    //Console message
    // console.log(`Starting at (${block}, ${e.target.dataset.column}, ${e.target.dataset.row})...`);

    //Set component wide variables that track a selection
    selectionActive = true;
    selectionStart = e.target;
    selectionEnd = e.target;
    setToggleState(e.target);
    toggleThis([e.target]);
  }

  //Handler function - Determine which cells to toggle based on mouseover
  const handleMouseOver = (e: React.BaseSyntheticEvent): void => {

    if(!selectionActive) {
      setSelection({...selection, "mouse": e.target.dataset.who.split(",")});
    }

    if (selectionActive) {
      //Console message
      // console.log(`Mouse over at (${e.target.dataset.column}, ${e.target.dataset.row})...`);
      // setSelection({ ...selection, "mouse": [] });

      //Set new end
      e.target as HTMLElement;
      selectionEnd = e.target;

      //Get Parent Element (Row Element)
      const parentElement = selectionEnd.parentElement as HTMLElement;

      //Get Table Element
      const tableBodyElement = tableBodyRef.current as HTMLElement;

      //Set toggle points
      const sizeArray = getCorners();
      const smallRow = sizeArray[0], bigRow = sizeArray[1], smallColumn = sizeArray[2], bigColumn = sizeArray[3];

      //Create a new array to send to helper
      const toggleWhat: Array<HTMLElement> = [];

      //Grab all selected rows
      const selectedRows = []

      for (let i=1; i < tableBodyElement.children.length; i++) {
        if(smallRow <= i && i <= bigRow) {
          console.log(`pushing ${tableBodyElement.children[i]} to selectedRows.`)
          selectedRows.push(tableBodyElement.children[i]);
        }
      }

      console.log('here is all selected rows');
      console.log(selectedRows);

      selectedRows.forEach(rowElement => {
        for (let j=1; j < rowElement.children.length; j++) {
          if (smallColumn <= j && j <= bigColumn) {
            console.log(`pushing ${rowElement.children[j]} to selectedCells.`);
            const newCell = rowElement.children[j] as HTMLElement;
            toggleWhat.push(newCell);
          }
        }
      })

      console.log('here is all selected cells');
      console.log(toggleWhat);

      toggleThis(toggleWhat);
    }

  }

  //Handler function - ends a selection when mouse up or cursor moves out of grid
  const handleMouseUp = () => {
    // console.log(`Stopping selection...`);
    selectionActive = false
    // console.log("sending selected cells to Available.tsx:");
    // console.log(selectedCells);
    setSelection({...selection, "available": selectedCells, "mouse": [] });
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="availability-shell">
      <div id="availability-contents" onMouseLeave={handleMouseUp} ref={tableBodyRef}>
        {generateTable()}
      </div>
    </div>
  )
}

export default Availability;