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

  /* ------------------------------------------ Table Generator Variables and State ------------------------------------------ */
  
  const early = eventData.early;
  const late = eventData.late;
  const days = eventData.days
  const attending = eventData.attending;

  //Get column and row numbers from props
  const numColumns = days.length;
  const numRows = Math.abs(late - early) * 2;

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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%% Table Generator Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper function (generateColumnLabels) - generate the text for column labels
  const columnLabelHelper = (index: number) => {
    let label = null;
    if (index !== 0) {
      const day = new Date(days[index - 1]);
      let text = day.toDateString().substring(0, 10);
      label = <p className="availability-column-label-text">{text}</p>
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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Table Generator Functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

    //Generator function - labels for columns
    const generateTableHeader = () => {
        let content = [], label = null;

        //Generate an array of column labels
        for (let i = 0; i <= numColumns; i++) {
            label = columnLabelHelper(i);
            content.push(
                <th key={`column-${i}-label`} data-column={i} className="availability-column-label-Cell">
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
          <td 
          className={`availability-cell ${whatColor}`} 
          key={`cell-${i}`} 
          data-row={row} 
          data-column={i} 
          data-who={whoAvailable}>
          </td>
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