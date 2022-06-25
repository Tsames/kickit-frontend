//Dependencies
import { React, useState } from 'react';

//Styling
import '../../styles/display_styling/attendance_chart.scss';

const AttendanceChart = ({ attending, days, early, late, block, handleHover }) => {
  /* ------------------------------------------ Grid Generator Functions & Variables ------------------------------------------*/

  //Get column and row numbers from props
  const numColumns = days.length;
  const numRows = Math.abs(late - early) * 2;


  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%% Labels Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Generate the hour text for row labels
  const rowLabelHelper = (index) => {
    let label = null, moreHours = Math.floor(index / 2);
    let suffix = (early + moreHours) > 11 && (early + moreHours) < 24 ? "PM" : "AM";
    let base = (early + moreHours) > 12 ? (early + moreHours) - 12 : early + moreHours;
    if (index % 2 === 0) {
      label = <p className="chartRowLabelText">{`${base} ${suffix}`}</p>
    } else {
      label = <p className="chartRowLabelText">{`${base}:30`}</p>
    }
    return label;
  }

  //Helper function to arrange the text for column labels
  const columnLabelHelper = (index) => {
    let label = null;
    if (index !== 0) {
      const day = new Date(days[index - 1]);
      let text = day.toDateString().substring(0, 10);
      label = <p className="chartColumnLabelText">{text}</p>
    }
    return label;
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Labels %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Generates the labels for rows
  const generateRowLabels = (rows) => {
    let content = [], label = null;

    //Generate an array of row labels
    for (let i = 0; i < numRows; i++) {
      label = rowLabelHelper(i);
      content.push(
        <div key={`${i}`} data-row={i} className="chartRowLabelCell">
          {label}
        </div>
      )
    }

    //Return the array of row labels we made above wrapped inside a container div
    return (
      <div key={"rowLabels"} className="chartRowLabels">
        {content}
      </div>
    )
  }

  //Generate the labels for columns
  const generateColumnLabels = () => {
    let content = [], label = null;

    //Generate an array of column labels
    for (let i = 0; i <= numColumns; i++) {
      label = columnLabelHelper(i)
      content.push(
        <div key={`${i}`} data-column={i} className="chartColumnLabelCell">
          {label}
        </div>
      )
    }

    //Return the array of column labels we made above wrapped inside a container div
    return (
      <div key={"columnLabels"} className="chartColumnLabels">
        {content}
      </div>
    )
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%% Chart Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper function gets an array of names of all attendees who are available at that time
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

  //Helper function that assigns cells a class that colors them based on the percentage
  //of total attendees that reported they are available at the time this cell represents
  const determineColor = (count) => {
    const totalCount = attending.length;
    const percentage = (count / totalCount) * 100;
    if (percentage === 1) {
      return "everyoneAvailable";
    } else if (percentage >= 75) {
      return "alotAvailable";
    } else if (percentage >= 50) {
      return "someAvailable";
    } else if (percentage >= 25) {
      return "fewAvailable";
    } else {
      return "veryFewAvailable";
    }
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Chart %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Generates the rows within a column
  const generateRows = (column) => {
    let content = []
    for (let i = 1; i <= numRows; i++) {
      const whoAvailable = determineWho(column, i);
      const whatColor = determineColor(whoAvailable.length);
      content.push(
        <div className={`chartCell ${whatColor}`} key={`${i}`} data-block={block} data-column={column} data-row={i} data-who={whoAvailable} onMouseEnter={handleHover}>
        </div>
      )
    }
    return content
  }

  //Main generator function that generates the columns of a chart
  const generateColumns = () => {
    let content = []
    content.push(generateRowLabels());
    for (let i = 1; i <= numColumns; i++) {
      content.push(
        <div key={`${i}`} data-block={block} data-column={i} className="chartColumn">
          {generateRows(i)}
        </div>
      )
    }
    return content
  }

  /* ------------------------------------------ Event Functions ------------------------------------------*/
  // const [output, setOutput] = useState("test");

  // const handleHover = (event) => {
  //   const newOutput = event.target.dataset.who.replaceAll(",", ", ");
  //   setOutput(newOutput);
  // }


  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    // <div>
    //   <p id="hoverOutput">{output}</p>
    <div className="attendanceChart">
      {generateColumnLabels()}
      <div className="chartContents">
        {generateColumns()}
      </div>
    </div>
    // </div>
  )
}

export default AttendanceChart;