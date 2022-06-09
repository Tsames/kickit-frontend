//Dependencies
import { React, useState, useEffect } from 'react';

//Import Components
import AttendForm from "../form_components/AttendForm";

//Styling
import '../../styles/form_styling/attend_form.scss';

const ViewEvent = ({match}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const id = match.params.id;
  const URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/" + id;

  //Stores event data
  const [event, setEvent] = useState(null);
  //Toggles what the page displays
  const [viewAttendance, setViewAttendance] = useState(false);

  /* ------------------------------------------ Helper Functions ------------------------------------------*/



  /* ------------------------------------------ Fetch Event Data ------------------------------------------*/

  //Helper function - gets relevant event data
  const getEventData = async () => {
    try {
      //Fetch event data
      const response = await fetch(URL);
      const data = await response.json()

      //Set event state
      setEvent(data);

    } catch (error) {
      console.log(error);
    }
  }

  //Run to get relevant event data upon first loading
  useEffect(() => getEventData(), []);

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  const loading = () => {
    return (
      <h4>Loading...</h4>
    )
  }

  const loaded = () => {

    return (
      <>
        <p>{event.title}</p>
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (

    <div id="view-event-shell" className="page-body">
      <div>
        <h3>{event.title}</h3>
      </div>

      {event === null ? loading() : loaded()}
    </div>
  )
}

export default ViewEvent;