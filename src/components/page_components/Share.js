//Dependencies
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Import Components
import Peek from './Peek';
import Attend from './Attend';

//Styling
import '../../styles/page_styling/share.scss';

const Share = ({ getEventData, event, blocks, URL }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  //State to track which component to show - default is peek
  const [action, setAction] = useState("peek");

  //Set root style based on page
  useEffect(() => {
    document.getElementById('root').className = 'rb-share';
    if (event) helper();

    /* If the event stored in state does not have the same id as the id in params then call
    getEventData from App.js and get the data of the event that matches the id in params */
    if (event === null || id !== event._id) {
      getEventData(id);
    }
  });

  const helper = () => {
    if (action === "peek") {
      document.getElementById("action-peek").classList.add("active-action");
      document.getElementById("action-attend").classList.remove("active-action");
    } else {
      document.getElementById("action-attend").classList.add("active-action");
      document.getElementById("action-peek").classList.remove("active-action");
    }
  }

  //Get Id from params
  const id = useParams().id;

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */


  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  //JSX to display if event is still in the process of loading
  const noEvent = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  const showPeek = () => {
    return(
      <Peek event={event} blocks={blocks}/>
    )
  }

  const showAttend = () => {
    return(
      <Attend event={event} blocks={blocks} URL={URL}/>
    )
  }

  //Main JSX
  const share = () => {
    return (
      <>
        <div id="share-event">
          <h1>{event.title}</h1>
          <h4>@ {event.location}</h4>
          <p id="event-description">{event.description}</p>
          <div id="share-select">
            <button id="action-peek" className="share-action-button" onClick={() => setAction("peek")}>View Attendance</button>
            <button id="action-attend" className="share-action-button" onClick={() => setAction("attend")}>Sign Up!</button>
          </div>
        </div>
        { action === "peek" ? showPeek() : showAttend()}
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="share-wrapper">
      { event ? share(): noEvent() }
    </div>
  )
}

export default Share;