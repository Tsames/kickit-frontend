//Dependencies
import { React, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//Import Components
import ShareToGrids from '../transition_components/ShareToGrids';

//Styling
import '../../styles/page_styling/share.scss';

const Share = ({ setRoot, getEventData, event}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();
  
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

  //Handler function - runs the transition animation and then navigates to either Attend.js or Peek.js
  const handleNavigate = (event) => {
    const transitionLeft = document.getElementById("share-to-grids-transition-left");
    const transitionRight = document.getElementById("share-to-grids-transition-right");

    transitionLeft.className = "share-to-grids-transition-left-move";
    transitionRight.className = "share-to-grids-transition-right-move";
    setTimeout(() => {
      navigate(`/${event.target.dataset.to}/${id}`)
    }, 2000)
  }

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
      <div id="share-main">
        <ShareToGrids />
        <div id="share-left">
          <h3>{event.title}</h3>
          <p>@ {event.location}</p>
          <p id="event-description">{event.description}</p>
        </div>
        <div id="share-right">
          <button className="share-button" onClick={handleNavigate} data-to="attend">Sign Up!</button>
          <button className="share-button" onClick={handleNavigate} data-to="peek">View Attendance</button>
        </div>
      </div>
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