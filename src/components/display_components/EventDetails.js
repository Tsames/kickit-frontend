//Dependencies
import { React } from 'react';

//Styling
import '../../styles/display_styling/event_details.scss';

const EventDetails = ({ event }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/


  /* ------------------------------------------ Helper Functions ------------------------------------------*/

  /* ------------------------------------------ Fetch Event Data ------------------------------------------*/

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div>
      <h3 className="eventDetail">{event.title}</h3>
      <p className="eventDetail">@ {event.location}</p>
      <p id="event-description" className="eventDetail">{event.description}</p>
    </div>
  )
}

export default EventDetails;