//Dependencies
import { React } from 'react';

//Styling
import '../../styles/display_styling/attendance_chart.scss';

const AttendanceChart = ({ attending, days, early, late, block, handleHover, limit }) => {

  /* ------------------------------------------ Grid Generator Functions, Variables, and their Helpers ------------------------------------------ */

  //Get column and row numbers from props
  const numColumns = days.length;
  const numRows = Math.abs(late - early) * 2;


  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%% Labels Helpers %%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  //Helper function (generateRowLabels) - generate the text for row labels
  const rowLabelHelper = (index) => {
    let label = null, moreHours = Math.floor(index / 2);
    let suffix = (early + moreHours) > 11 && (early + moreHours) < 24 ? "PM" : "AM";
    let base = (early + moreHours) > 12 ? (early + moreHours) - 12 : early + moreHours;
    if (index % 2 === 0) {
      label = <p className="chartRowLabelText">{`${base}:00 ${suffix}`}</p>
    } else {
      label = <p className="chartRowLabelText">{`${base}:30 ${suffix}`}</p>
    }
    return label;
  }

  //Helper function (generateColumnLabels) - generate the text for column labels
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

  //Generator function - labels for rows
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

  //Generator function - labels for columns
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
  const generateRows = (column) => {
    let content = []
    for (let i = 1; i <= numRows; i++) {
      const whoAvailable = determineWho(column, i);
      if (limit.active) {
        const whatColor = determineColorLimited(whoAvailable);
        content.push(
          <div className={`chartCell ${whatColor}`} key={`${i}`} data-block={block} data-column={column} data-row={i} data-who={whoAvailable} onMouseEnter={handleHover}>
          </div>
        )
      } else {
        const whatColor = determineColor(whoAvailable.length);
        content.push(
          <div className={`chartCell ${whatColor}`} key={`${i}`} data-block={block} data-column={column} data-row={i} data-who={whoAvailable} onMouseEnter={handleHover}>
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
      content.push(
        <div key={`${i}`} data-block={block} data-column={i} className="chartColumn">
          {generateRows(i)}
        </div>
      )
    }
    return content
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div className="attendanceChart">
      {generateColumnLabels()}
      <div className="chartContents">
        {generateColumns()}
      </div>
    </div>
  )
}

export default AttendanceChart;