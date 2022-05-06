//Dependencies
import { React, useState, useEffect } from 'react';

//Styling
import '../styles/availabilitiesform.scss';

const AvailabilitiesForm = ({match}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const id = match.params.id;
  const apiURL = `http://localhost:3001/events/${id}`;

  const [event, setEvent] = useState();


  /* ------------------------------------------ Form Logic ------------------------------------------*/

  const getEventData = async () => {
    const response = await fetch(apiURL);
    const data = response.json();
    setEvent(data)
  }

  useEffect(getEventData());

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div id="availabilities-form-shell" className="page-body">
      <h4>Availabilities</h4>
    </div>
  )
}

export default AvailabilitiesForm;