//Dependencies
import React, { FC } from "react";

//Import Components
import CopyLink from './child_components/copyLink';

//Styling
import '../../../styles/create_pages_styling/created_page/created.scss';

//Props Interface
interface createdProps  {
  event: {
    _id: string;
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
  };
}

const Created: FC<createdProps> = ({ event }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="created-shell">
      <div id="created-top-section">
        <h3 id="created-top-text" className="no-select">Lets</h3>
        <h1 id="created-top-header" className="no-select">Kick It</h1>
      </div>
      <div id="created-mid-section">
        <div id="created-mid-left-section">
          <div id="created-title-wrapper">
            <h3 id="created-title-label" className="created-event-details-label no-select">Title:</h3>
            <h3 id="created-title" className="created-event-details">{event.title}</h3>
          </div>
          <div id="created-location-wrapper">
            <h3 id="created-location-label" className="created-event-details-label no-select">Location:</h3>
            <h3 id="created-location" className="created-event-details">{event.location}</h3>
          </div>
          <div id="created-description-wrapper">
            <h3 id="created-description-label" className="created-event-details-label no-select">Description:</h3>
            <p id="created-description">{event.description}</p>
          </div>
        </div>
        <div id="created-mid-right-section">
          <h3>Nice work! Your event has been successfully created!</h3>
          <h3>Copy the link below and send it to all prospective attendees!</h3>
          <h5>Remember, all guests can see the availability of everyone else!</h5>
        </div>
      </div>
      <div id="created-bottom-section">
        <CopyLink></CopyLink>
        <div id="created-wallpaper"></div>
      </div>
    </div>
  )
}

export default Created;