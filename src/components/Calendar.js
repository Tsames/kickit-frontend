//Dependencies
import { React, useState } from 'react';

//Styling
import '../styles/calendar.scss';

const Calendar = () => {

  /* -------------------------  Helper Functions -------------------------*/

  //Helper function that resets the hours, minutes, seconds, and miliseconds
  const cleanDate = (date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
  }

  //Helper function that grabs the month of the given date in english
  const findMonth = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  }

  //Helper function that grabs the day of the week of the given date in english
  const findWeekDay = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  }

  /* -------------------------  Component Wide Variables & State -------------------------*/

  //The Page UseState keeps track of the month that the calendar should display
  const now = new Date(Date.now()); cleanDate(now);
  const [page, setPage] = useState(now);

  /* -------------------------  Generator Function -------------------------*/

  const generateCalendar = () => {

    //Create helper variables and return array
    let i = 0;
    const content = []; 
    const tracker = new Date(page);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    //Loop Over all remaining days of the month
    while (tracker.getDate() >= page.getDate() && tracker.getMonth() === page.getMonth()) {

      //Determine what day of the week the tracker is on
      const todayIs = findWeekDay(tracker);

      //If tracker is on the same day of the week as the index add a non-dummy div and increment tracker
      if (todayIs === weekdays[i]) {
        content.push(
          <div className="calendarItem" key={`calendar${tracker.getDate()}${weekdays[i]}`}>
            {tracker.getDate()}
          </div>
        )
        tracker.setDate(tracker.getDate() + 1);
        if (tracker.getDate() === 1) {
          tracker.setMonth(tracker.getMonth() + 1)
        }

      //Else the tracker must not be on the same day of the week as the index so add a dummy div  
      } else {
        content.push(
          <div className="calendarItem Invisible" key={`calendar${tracker.getDate()}${weekdays[i]}`}>
            0
          </div>
        )
      }

      //Increment our index and reset if 6
      i < 6 ? i++ : i = 0
    }
    return content
  }

  /* -------------------------  Event Functions -------------------------*/

  const handleNextMonth = () => {
    const newPage = new Date(page);
    newPage.setMonth(newPage.getMonth() + 1)
    newPage.setDate(1);
    setPage(newPage);
  }

  const handlePrevMonth = () => {
    //Only go to the previous month if the previous month is not in the past
    if (page.getMonth() !== now.getMonth() || page.getFullYear() > now.getFullYear()) {
      const newPage = new Date(page);
      newPage.setMonth(newPage.getMonth() - 1)
      //If going back to the current month set the earliest available day to today
      if (newPage.getMonth() !== now.getMonth() && newPage.getFullYear() !== now.getFullYear()) {
        newPage.setDate(1);
      } else {
        newPage.setDate(now.getDate());
      }
      setPage(newPage);
    }
  }

  /* ------------------------- Returning JSX ------------------------------*/
  return (
    <div className="calendarShell">
      <div className="calendarHeading calendarRow">
        <div id="calendarPrevMonth" className="calendarHeadingButton" onClick={handlePrevMonth}>{'<'}</div>
        <h4>{`${findMonth(page)}, ${page.getFullYear()}`}</h4>
        <div id="calendarNextMonth" className="calendarHeadingButton" onClick={handleNextMonth}>{'>'}</div>
      </div>
      <div className="calendarBody">
        <div id="sunday" className="calendarDayLabel calendarItem">Su</div>
        <div id="monday" className="calendarDayLabel calendarItem">M</div>
        <div id="tuesday" className="calendarDayLabel calendarItem">Tu</div>
        <div id="wednesday" className="calendarDayLabel calendarItem">W</div>
        <div id="thursday" className="calendarDayLabel calendarItem">Th</div>
        <div id="friday" className="calendarDayLabel calendarItem">F</div>
        <div id="satday" className="calendarDayLabel calendarItem">Sa</div>
        {generateCalendar()}
      </div>
    </div>
  )
}

export default Calendar;