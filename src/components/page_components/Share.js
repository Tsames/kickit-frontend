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
  //State to track which grid to show
  const [action, setAction] = useState("peek");

  //Set root style based on page
  useEffect(() => {
    document.getElementById('root').className = 'rb-share';
  });

  //Get Id from params
  const id = useParams().id;

  /* If the event stored in state does not have the same id as the id in params then call
  getEventData from App.js and get the data of the event that matches the id in params */
  if (event === null || id !== event._id) {
    getEventData(id);
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */


  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  //JSX to display if event is still in the process of loading
  const noEvent = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  //Main JSX
  const share = () => {
    return (
      <>
        <div id="share-event">
          <h3>{event.title}</h3>
          <p>@ {event.location}</p>
          <p id="event-description">{event.description}</p>
        </div>
        <div id="share-pageSelection">

        </div>
        <Peek event={event} blocks={blocks}/>
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="share-wrapper" className="page-body">
      {event === null ? noEvent() : share()}
    </div>
  )
}

export default Share;