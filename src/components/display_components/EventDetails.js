//Dependencies
import { React } from 'react';

//Styling
import '../../styles/display_styling/event_details.scss';

const EventDetails = ({ event }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/


  /* ------------------------------------------ Helper Functions ------------------------------------------*/

  // const getAttendeeNames = () => {
  //   const content = []
  //   event.attending.forEach((person) => {
  //     content.push(person.name);
  //   });
  //   return content.join(", ");
  // }

  /* ------------------------------------------ Fetch Event Data ------------------------------------------*/

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div>
      <h3 className="eventDetail">{event.title}</h3>
      <p className="eventDetail">{event.location}</p>
      <p className="eventDetail">{event.cost}</p>
      <p className="eventDetail">{event.description}</p>
    </div>
  )
}

export default EventDetails;