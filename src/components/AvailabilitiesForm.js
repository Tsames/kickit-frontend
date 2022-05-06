//Dependencies
import { React, useState, useEffect } from 'react';

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

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  const loading = () => {
    return(
      <h4>Loading...</h4>
    )
  }

  const loaded = () => {
    return(
      <h4>{event.title}</h4>
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