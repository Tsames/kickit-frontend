//Dependencies
import { React, useEffect, useState } from 'react';

//Import Components
import Peek from './Peek';
import Attend from './Attend';

//Styling
import '../../styles/page_styling/share.scss';

const Example = ({ event, blocks }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //State to track example data
  const [exampleEvent, setExampleEvent] = useState(event);

  //State to track which component to show - default is peek
  const [action, setAction] = useState("peek");

  //Set root style based on page
  useEffect(() => {
    document.getElementById('root').className = 'rb-share';

    if (action === "peek") {
      document.getElementById("action-peek").classList.add("active-action");
      document.getElementById("action-attend").classList.remove("active-action");
    } else {
      document.getElementById("action-attend").classList.add("active-action");
      document.getElementById("action-peek").classList.remove("active-action");
    }
  });

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  const showPeek = () => {
    return(
      <Peek event={exampleEvent} blocks={blocks}/>
    )
  }

  const showAttend = () => {
    return(
      <Attend example={true} event={exampleEvent} blocks={blocks} setAction={setAction} setExampleEvent={setExampleEvent}/>
    )
  }

  //Main JSX
  const example = () => {
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
      { example() }
    </div>
  )
}

export default Example;