//Dependencies
import { React, useEffect } from 'react';

//Styling
import '../../styles/display_styling/attendance_chart.scss';

const AttendanceChart = ({ attending, days, early, late, block, handleHover, limit }) => {

  /* ------------------------------------------ Grid Generator Functions, Variables, and their Helpers ------------------------------------------ */

  //Get column and row numbers from props
  const numColumns = days.length;
  const numRows = Math.abs(late - early) * 2;

  //Adjust Cell Width and Height based on numRows & numColumns
  useEffect(() => {
    const columnWidth =  Math.floor(90 / (numColumns + 1));
    const cellHeight = Math.floor(90 / (numRows));

    document.getElementById("attendance-wrapper").style.setProperty("--column-width", `${columnWidth}%`);
    document.getElementById("attendance-wrapper").style.setProperty("--cell-height", `${cellHeight}%`);
  })

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%% Labels Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper function (generateRowLabels) - generate the text for row labels
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

  //Helper function (generateColumnLabels) - generate the text for column labels
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
    for (let i = 0; i < numRows; i++) {
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
        label = columnLabelHelper(i);
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

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%% Chart Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  /* Helper function (generateRows) - gets an array of names of all attendees 
  who are available at that time */
  const determineWho = (column, row) => {
    const list =[];

    attending.forEach((person) => {
      person.available.every((time) => {
        //Search for the given cell for each person - if found move to next person.
        if (time[0] === block && time[1] === column && time[2] === row) {
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

  /* Helper function (generateRows) - assigns cells a class that colors them based on the percentage
  of total attendees that reported they are available at the time this cell represents */
  const determineColor = (count) => {
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

  //Helper function (generateRows) - assigns cells a class that colors them if limit is active
  const determineColorLimited = (whoAvailable) => {
    if (whoAvailable.includes(limit.name)) {
      return "everyoneAvailable";
    } else {
      return  "noneAvailable";
    }
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Chart %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Generator function - rows within a column
  const generateRows = (column, empty = false) => {
    let content = []

    for (let i = 1; i <= numRows; i++) {

      //If the column is not null
      if (!empty) {
        const whoAvailable = determineWho(column, i);
        //Class that determines color of the cell assigned by helper functions based on whether or not a limit is active
        const whatColor = limit.active ? determineColorLimited(whoAvailable) : determineColor(whoAvailable.length);
        content.push(
          <div className={`chartCell ${whatColor}`} key={`${i}`} data-block={block} data-column={column} data-row={i} data-who={whoAvailable} onMouseEnter={handleHover}>
          </div>
        )

      //Each cell of column should be invisible
      } else {
        content.push(
          <div className={`chartCell empty`} key={`${i}`} data-block={block} data-column={column} data-row={i}>
          </div>
        )
      }
    }
    return content
  }

  //Main generator function - columns of a chart
  const generateColumns = () => {
    let content = []
    content.push(generateRowLabels());

    for (let i = 1; i <= numColumns; i++) {
      //If the column's corresponding date is not null
      if (days[i - 1] !== null) {
        content.push(
          <div key={`${i}`} data-block={block} data-column={i} className="chartColumn">
            {generateRows(i)}
          </div>
        )
      //If the column should represent a null date (empty column)
      } else {
        content.push(
          <div key={`${i}`} data-block={block} data-column={i} className="chartColumn emptyColumn">
            {generateRows(i, true)}
          </div>
        )
      }

    }
    return content
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="attendance-wrapper">
      {generateColumnLabels()}
      <div id="attendance-contents">
        {generateColumns()}
      </div>
    </div>
  )
}

export default AttendanceChart;