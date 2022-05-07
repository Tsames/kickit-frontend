//Dependencies
import { React, useState, useEffect } from 'react';

//Import Components
import Grid from "./Grid";

//Styling
import '../styles/availabilitiesform.scss';

const AvailabilitiesForm = ({match}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const id = match.params.id;
  const apiURL = `http://localhost:3001/events/${id}`;

  const [event, setEvent] = useState(null);

  /* ------------------------------------------ Fetch Data ------------------------------------------*/

  //Helper function - gets relevant event data
  const getEventData = async () => {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw Error("Could not retrieve data.")
      }
      const data = await response.json()
      setEvent(data);
    } catch (error) {
      console.log(error);
    }
  }

  //Run to get relevant event data upon first loading
  useEffect(() => getEventData(), []);

  //Prepare data
  const getDayArray = () => {
    return event.days.split(';').map((datetime) => new Date(datetime));
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  const loading = () => {
    return(
      <h4>Loading...</h4>
    )
  }

  const loaded = () => {
    const daysArray = getDayArray();
    return(
      <>
        <h1>{event.title}</h1>
        <h6>{event.location}</h6>
        <p>{event.description}</p>
        <p>days: {daysArray[0].day}</p>
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div id="availabilities-form-shell" className="page-body">
      {event === null ? loading() :  loaded()}
    </div>
  )
}

export default AvailabilitiesForm;