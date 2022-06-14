//Dependencies
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Import Components
import AttendForm from "../form_components/AttendForm";
import AttendanceChart from "./AttendanceChart";

//Styling
import '../../styles/form_styling/attend_form.scss';

const ViewEvent = ({match, setRoot}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const id = match.params.id;
  const URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/" + id;
  setRoot("rb-view-event");

  //Stores event data
  const [event, setEvent] = useState(null);

  //States to keep track of the page that is displayed
  //True => View Attendance / False => Sign Up
  const [page, setPage] = useState(true);

  /* ------------------------------------------ Helper Functions ------------------------------------------*/

  const getAttendeeNames = () => {
    const content = []
    event.attending.forEach((person) => {
      content.push(person.name);
    });
    return content.join(", ");
  }

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

  //Loading animation if event is still in the process of loading
  const eventLoading = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  //Page Layout when event has loaded
  const eventLoaded = () => {
    return (
      <>
        <div id="leftSide">
          {eventDetailsLoaded()}
        </div>
        <div id="rightSide">
          {eventSchedulingLoaded()}
        </div>
      </>
    )
  }

  //Event details for the left side of the page
  const eventDetailsLoaded = () => {
    return (
      <>
        <h3 className="eventDetail">{event.title}</h3>
        <p className="eventDetail">{event.location}</p>
        <p className="eventDetail">{event.cost}</p>
        <p className="eventDetail">{event.description}</p>
        <p className="eventDetail">Attending: {getAttendeeNames()}</p>
        <button><Link to={`/attend/${id}`}>Sign Up!</Link></button>
      </>
    )
  }

  //Event scheduling for the right side of the page
  const eventSchedulingLoaded = () => {
    return (
      <>
        <AttendanceChart event={event}/>
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (

    <div id="view-event-shell" className="page-body">
      { event !== null ? eventLoaded() : eventLoading()}
    </div>
  )
}

export default ViewEvent;