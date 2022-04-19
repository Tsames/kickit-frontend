//Dependencies
import { React, useState } from 'react';

//Styling
import '../styles/calendar.scss';

const Calendar = () => {

  const now = new Date(Date.now());
  const [calendar, setCalendar] = useState(now);
  console.log(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(calendar));

  /* ------------------------- Returning JSX ------------------------------*/
  return (
    <div className="calendarShell">
      <div className="calendarDaysCaption">
        <div className="calendarSunday">Su</div>
        <div className="calendarMonday">M</div>
        <div className="calendarTuesday">Tu</div>
        <div className="calendarWednesday">W</div>
        <div className="calendarThursday">Th</div>
        <div className="calendarFriday">F</div>
        <div className="calendarSaturday">Sa</div>
      </div>

    </div>
  )
}

export default Calendar;