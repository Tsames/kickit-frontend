//Dependencies
import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//Import Components
import ShareToGrids from '../transition_components/ShareToGrids';

//Styling
import '../../styles/page_styling/share.scss';

const Share = ({ setRoot, getEventData, event}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/
  //Set root style based on page
  setRoot("rb-view-event");

  const id = useParams().id;
  console.log(`Id from params is ${id}. With a type of ${typeof(id)}`);
  console.log(`And event id is ${event !== null ? event.id : "no event"}. With a type of ${event !== null ? typeof(event.id) : "no event"}`);

  /* If the event stored in state does not have the same id as the id in params then call
  getEventData from App.js and get the data of the event that matches the id in params */
  if (event === null || Number(id) !== event.id) {
    getEventData(id);
  }

  let navigate = useNavigate();

  /* ------------------------------------------ Helper Functions ------------------------------------------*/

  //Helper function - runs the transition animation and then navigates to either Attend.js or Peek.js
  const handleNavigate = (event) => {
    const transitionLeft = document.getElementById("share-to-grids-transition-left");
    const transitionRight = document.getElementById("share-to-grids-transition-right");

    transitionLeft.className = "share-to-grids-transition-left-move";
    transitionRight.className = "share-to-grids-transition-right-move";
    setTimeout(() => {
      navigate(`/${event.target.dataset.to}/${id}`)
    }, 2000)
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  //JSX to display if event is still in the process of loading
  const noEvent = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  //Details
  const share = () => {
    return (
      <div id="share-wrapper" className="page-body">
        <div id="share-main">
          <ShareToGrids />
          <div id="share-left">
            <h3 className="eventDetail">{event.title}</h3>
            <p className="eventDetail">@ {event.location}</p>
            <p id="event-description" className="eventDetail">{event.description}</p>
          </div>
          <div id="share-right">
            <button className="share-button" onClick={handleNavigate} data-to="attend">Sign Up!</button>
            <button className="share-button" onClick={handleNavigate} data-to="peek">View Attendance</button>
          </div>
        </div>
      </div>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div>
      {event != null ? share() : noEvent()}
    </div>
  )
}

export default Share;