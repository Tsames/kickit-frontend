//Dependencies
import { React } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

//Styling
import '../../styles/confirmation_styling/create_event_success.scss';

const CreateEventSuccess = ({ setRoot, getEventData, event, URL }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //Get Id from params
  const id = useParams().id;

  let navigate = useNavigate();

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div className="create-event-success-wrapper">
      <h1 id="create-event-success-title">Event Successfully Created!</h1>
      <p id="create-event-success-explained">You can now share your event with other people. Either provide them with the link below or have them enter the following id into the search bar on the home page.</p>
      <h6 id="create-event-success-url">URL: {`${URL}share/${id}`}</h6>
      <h6 id="create-event-success-id">ID: {`${id}`}</h6>
      <button><Link id="create-event-success-to-event">View Event</Link></button>
    </div>
  )
}

export default CreateEventSuccess;