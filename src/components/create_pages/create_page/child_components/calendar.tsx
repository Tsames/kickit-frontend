//Dependencies
import React from "react";
import { FC, MouseEvent, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { motion } from 'framer-motion';

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/calendar.scss';

//Attending Interface
interface attendingInterface {
  name: string;
  available: Array<[number, number, number]>;
}

//Props Interface
interface CalendarProps  {
  newForm: {
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
    attending: Array<attendingInterface>;
  };
  setNewForm: React.Dispatch<React.SetStateAction<any>>;
}

const Calendar: FC<CalendarProps> = ({ newForm, setNewForm }) => {

  /* ------------------------- Component Wide Variables & State ------------------------- */

  //Helper function (variable now) - sets the hours, minutes, seconds, and miliseconds to 0
  const cleanDate = (date : Date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
  }

  //The Page UseState keeps track of the month that the calendar should display
  const now = new Date(Date.now()); cleanDate(now);
  const [page, setPage] = useState<Date>(now);

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Hover
  const monthHover = {
    scale: 1.3,
    transition: {
      duration: 0.2,
    }
  }

  const selectableHover = {
    scale: 1.25,
    backgroundColor: "#CEFFE5",
    transition: {
      duration: 0.2,
    }
  }

  const unselectableHover = {
    scale: 1.25,
    transition: {
      duration: 0.2,
    }
  }

  const maxedHover = {
    scale: 1.25,
    backgroundColor: "#d37373",
    transition: {
      duration: 0.2,
    }
  }

  //Tap
  const monthTap = {
    scale: 0.8,
  }

  const selectableTap = {
    scale: 0.9,
    backgroundColor: "#9AFF9E",
  }

  const maxedTap = {
    scale: 0.9,
    color: "#721717",
    backgroundColor: "#e95151",
    x: [0, -6, 0, 6, 0, -6, 0, 6, 0, -6, 0, 6, 0, -6, 0, 6, 0]
  };

  /* ------------------------- Helper Functions ------------------------- */

  //Helper function (returning JSX) - grabs the month of the given date in english
  const findMonth = (date : Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  }

  //Helper function (generateCalendar) - grabs the day of the week of the given date in english
  const findWeekDay = (date : Date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  }

  //Helper function (generateCalendar, handleClick) - recursive binary search that checks if a 
  //datetime is already in the days array and returns the index of the element if found or -1 if not found
  const checkDays = (arr : number[], element: number, pivot = (arr.length - 1) / 2 | 0, index = (arr.length - 1) / 2 | 0) :number => {

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
    const content = [];

    const tracker = new Date(page);
    tracker.setDate(1);
    let week = 1;
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    //Loops as long as the tracker is on the right month
    while (tracker.getMonth() === page.getMonth()) {

      const cells = [];

      //Loop over a week
      for (let i = 0; i <= 6; i++) {

        //Determine what day of the week the tracker is on
        const todayIs = findWeekDay(tracker);

        //If tracker is on the same day of the week as the index.
        if (todayIs === weekdays[i] && tracker.getMonth() === page.getMonth()) {

          //If tracker is on a day in the past
          if (tracker.getDate() < page.getDate()) {

            cells.push(
              <motion.div className="calendar-item unselectable"
                key={`calendar${tracker.getDate()}`}
                data-time={tracker.getTime()}
                whileHover={unselectableHover}>
                <p className="no-select">{tracker.getDate()}</p>
              </motion.div>
            )

            //Else, the tracker is either on today or a day in the future this month
          } else {
            cells.push(
              <motion.div className={checkDays(newForm.days, tracker.getTime()) >= 0 ? "calendar-item selectable calendar-selected" : "calendar-item selectable"}
              /* This in-line stlye became necessary to correctly color when unselecting previously selected items upon navigating back to a month previously visited on the calendar component.
              Weirdly specific situation, i know.
              This is due to how the framer motion library is working under the hood.*/
                style={{"backgroundColor": "rgba(0,0,0,0)"}}
                key={`calendar${tracker.getDate()}`}
                data-time={tracker.getTime()}
                onClick={handleClick}
                whileHover={newForm.days.length < 7 ? selectableHover : maxedHover}
                whileTap={newForm.days.length < 7 ? selectableTap : maxedTap}>
                <p className="no-select">{tracker.getDate()}</p>
              </motion.div>
            )
          }

          //If the tracker loops around on days add 1 to its month
          tracker.setDate(tracker.getDate() + 1);
          if (tracker.getDate() === 1) {
            tracker.setMonth(tracker.getMonth() + 1)
          }
        }

        //Else the tracker must not be on the same day of the week as the index so add a dummy div
        else {
          cells.push(
            <div className="calendar-item invisible no-select" key={`calendar${tracker.getDate()}${weekdays[i]}`}>
            </div>
          )
        }
      }


      content.push(
        <motion.div className="calendar-row" key={`${page.getMonth()}-${week}`} initial={{opacity: 0}} animate={{ opacity: 1}} transition={{duration: 0.3, delay: (week * 0.3)}}>
          {cells}
        </motion.div>
      )

      week ++;
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

  //Handler function - adds and remove days to and from newForm state of create.tsx
  const handleClick = (event :MouseEvent<HTMLDivElement>) :void => {

    const element = event.target as HTMLDivElement
    const className = element.className;
    const classList = element.classList;
    const dataset = element.dataset;

    //Only if calendarSelected is not on the element already
    if (className === "calendar-item selectable") {

      //If there are fewer than 7 days selected already
      if (newForm.days.length < 7) {

        //Add css class
        classList.add("calendar-selected");

        //Add element to days array
        const newDays = [...newForm.days, Number(dataset.time)];
        newDays.sort(function (a, b) { return a - b });
        setNewForm({ ...newForm, "days": newDays });

      }


    //Otherwise if the element has the calendarSelected class
    } else {

      //Remove the css class
      classList.remove("calendar-selected");
      // console.log('removing class from selected item.')

      //Find index of the element in days array
      const index = checkDays(newForm.days, Number(dataset.time));

      //Remove element at index from days array and set new days array
      const newDays = [...newForm.days];
      newDays.splice(index, 1);
      setNewForm({ ...newForm, "days": newDays });
    }
  }
  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------- Returning JSX ------------------------------ */

  return (
    <motion.div id="calendar-shell">
      <div id="calendar-heading">
        <motion.div whileHover={monthHover} whileTap={monthTap} onClick={handlePrevMonth}>
          <BiLeftArrow id="calendar-prev-month" className={ page.getMonth() === now.getMonth() ? "calendar-heading-button no-select invisible" : "calendar-heading-button" }></BiLeftArrow>
        </motion.div>
        <motion.h4 key={page.getMonth()} className="no-select" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.7}}>{`${findMonth(page)} ${page.getFullYear()}`}</motion.h4>
        <motion.div whileHover={monthHover} whileTap={monthTap}>
          <BiRightArrow id="calendar-next-month" className="calendar-heading-button" onClick={handleNextMonth}></BiRightArrow>
        </motion.div>
      </div>
      <div id="calendar-body">
        <div className="calendar-label-row">
          <div id="sunday" className="calendar-label calendar-item no-select">Sun</div>
          <div id="monday" className="calendar-label calendar-item no-select">Mon</div>
          <div id="tuesday" className="calendar-label calendar-item no-select">Tue</div>
          <div id="wednesday" className="calendar-label calendar-item no-select">Wed</div>
          <div id="thursday" className="calendar-label calendar-item no-select">Thur</div>
          <div id="friday" className="calendar-label calendar-item no-select">Fri</div>
          <div id="satday" className="calendar-label calendar-item no-select">Sat</div>
        </div>
        {generateCalendar()}
      </div>
    </motion.div>
  )
}

export default Calendar;