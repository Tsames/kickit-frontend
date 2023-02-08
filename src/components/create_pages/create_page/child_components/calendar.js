//Dependencies
import { React, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { motion } from 'framer-motion';

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/calendar.scss';

const Calendar = ({newForm, setNewForm}) => {
  
  /* ------------------------- Component Wide Variables & State ------------------------- */

  //Helper function (variable now) - sets the hours, minutes, seconds, and miliseconds to 0
  const cleanDate = (date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
  }

  //The Page UseState keeps track of the month that the calendar should display
  const now = new Date(Date.now()); cleanDate(now);
  const [page, setPage] = useState(now);

  console.log(`Now is ${now.getMonth()}`);
  console.log(`Page is ${page.getMonth()}`);
  console.log(now.getMonth() !== page.getMonth());

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Hover
  const calendarItemHover = {
    scale: 1.05,
    backgroundColor: "#CEFFE5",
    transition: {
      duration: 0.2,
    }
  }

  //Tap
  const calendarItemTap = {
    scale: 0.9,
    backgroundColor: "#9AFF9E",
  }

  /* ------------------------- Helper Functions ------------------------- */

  //Helper function (returning JSX) - grabs the month of the given date in english
  const findMonth = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  }

  //Helper function (generateCalendar) - grabs the day of the week of the given date in english
  const findWeekDay = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  }

  //Helper function (generateCalendar, handleClick) - recursive binary search that checks if a 
  //datetime is already in the days array and returns the index of the element if found or -1 if not found
  const checkDays = (arr, element, pivot = (arr.length - 1) / 2 | 0, index = (arr.length - 1) / 2 | 0) => {

    //--- Base Case Check ---
    if (arr.length === 0) {
      return -1
    } else if (arr[pivot] === element) {
      return index
    } else if (arr.length === 1 && arr[0] !== element) {
      return -1
    // --- Calls on Subsections of the Array ---

    //Call if element is greater than pivot
    } else if (arr[pivot] < element) {
      const newArr = arr.slice(pivot + 1, arr.length)
      pivot = (newArr.length - 1) / 2 | 0;
      index += pivot + 1
      return checkDays(newArr, element, pivot, index)

    //Call if element is less than pivot
    } else {
      const newArr = arr.slice(0, pivot);
      pivot = (newArr.length - 1) / 2 | 0;
      index -= (newArr.length) - pivot
      return checkDays(newArr, element, pivot, index)
    }
  }

  /* ------------------------- Generator Function ------------------------- */

  //Main generator function - generates an array of divs that represent days.
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
          <motion.div className={checkDays(newForm.days, tracker.getTime()) >= 0 ? "calendar-item selectable calendar-selected" : "calendar-item selectable"}
           key={`calendar${tracker.getDate()}${weekdays[i]}`}
           data-time={tracker.getTime()} 
           onClick={handleClick}
           whileHover={calendarItemHover}
           whileTap={calendarItemTap}>
            <p className="no-select">{tracker.getDate()}</p>
          </motion.div>
        )

        //If the tracker loops around on days add 1 to its month
        tracker.setDate(tracker.getDate() + 1);
        if (tracker.getDate() === 1) {
          tracker.setMonth(tracker.getMonth() + 1)
        }

      //Else the tracker must not be on the same day of the week as the index so add a dummy div  
      } else {
        content.push(
          <div className="calendar-item Invisible" key={`calendar${tracker.getDate()}${weekdays[i]}`}>
          </div>
        )
      }

      //Increment our index and reset if 6
      i < 6 ? i++ : i = 0
    }
    return content
  }

  /* ------------------------- Event Handler Functions ------------------------- */

  //Handler function - increments the month of calendar
  const handleNextMonth = () => {
    const newPage = new Date(page);
    newPage.setMonth(newPage.getMonth() + 1)
    newPage.setDate(1);
    setPage(newPage);
  }

  //Handler function - decrements the month of calendar
  const handlePrevMonth = () => {
    //Only go to the previous month if the previous month is not in the past
    if (page.getMonth() !== now.getMonth() || page.getFullYear() > now.getFullYear()) {
      const newPage = new Date(page);
      newPage.setMonth(newPage.getMonth() - 1)
      //If going back to the current month set the earliest available day to today
      if (newPage.getMonth() !== now.getMonth() || newPage.getFullYear() !== now.getFullYear()) {
        newPage.setDate(1);
      } else {
        newPage.setDate(now.getDate());
      }
      setPage(newPage);
    }
  }

  //Handler function - adds and remove days to and from form state of Attend.js
  const handleClick = (event) => {

    //Only if calendarSelected is not on the element already
    if (event.target.className === "calendar-item selectable") {

      //Add css class
      event.target.classList.add("calendar-selected");

      //Add element to days array
      const newDays = [...newForm.days, Number(event.target.dataset.time)];
      newDays.sort(function (a, b) { return a - b });
      setNewForm({ ...newForm,  "days": newDays });

    //Otherwise if the element has the calendarSelected class
    } else {

      //Remove the css class
      event.target.classList.remove("calendar-selected");

      //Find index of the element in days array
      const index = checkDays(newForm.days, Number(event.target.dataset.time));

      //Remove element at index from days array and set new days array
      const newDays = [...newForm.days];
      newDays.splice(index, 1);
      setNewForm({ ...newForm, "days": newDays });
    }
  }
  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  const showPrevMonth = (show) => {
    if(show) {
      return(
        <BiLeftArrow id="calendar-prev-month" className="calendar-heading-button" onClick={handlePrevMonth}></BiLeftArrow>
      )
    } else {
      return(
        <BiLeftArrow id="calendar-prev-month" className="calendar-heading-button Invisible" onClick={handlePrevMonth}></BiLeftArrow>
      )
    }
  }

  /* ------------------------- Returning JSX ------------------------------ */

  return (
    <div id="calendar-shell">
      <div id="calendar-heading">
        {page.getMonth() !== now.getMonth() ? showPrevMonth(true) : showPrevMonth()}
        <h4>{`${findMonth(page)} ${page.getFullYear()}`}</h4>
        <BiRightArrow id="calendar-next-month" className="calendar-heading-button" onClick={handleNextMonth}></BiRightArrow>
      </div>
      <div id="calendar-body">
        <div id="sunday" className="calendar-day-label calendar-item no-select">Sun</div>
        <div id="monday" className="calendar-day-label calendar-item no-select">Mon</div>
        <div id="tuesday" className="calendar-day-label calendar-item no-select">Tue</div>
        <div id="wednesday" className="calendar-day-label calendar-item no-select">Wed</div>
        <div id="thursday" className="calendar-day-label calendar-item no-select">Thur</div>
        <div id="friday" className="calendar-day-label calendar-item no-select">Fri</div>
        <div id="satday" className="calendar-day-label calendar-item no-select">Sat</div>
        {generateCalendar()}
      </div>
    </div>
  )
}

export default Calendar;