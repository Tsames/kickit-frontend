//Dependencies
import React, { FC, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from 'framer-motion';

//Import Components
import CopyLink from './child_components/copyLink';
import ModalLoading from "../../loading_pages/modalLoading";
import NoSuchEvent from "../../error_pages/noSuchEvent";

//Styling
import '../../../styles/create_pages_styling/created_page/created.scss';

//Props Interface
interface createdProps  {
  getEventData: (id :string) => Promise<boolean>
  event: {
    _id: string;
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
    attending: Array<number>[];
  };
}

const Created: FC<createdProps> = ({ getEventData, event }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  const location = useLocation();

  const [pageState, setPageState] = useState<number>(0);

  useEffect(() => {

    const paramId = location.pathname.slice(9);

    //If the Id in params does not match the current id
    if (paramId !== event._id) {
      getEventData(paramId);
    }

  }, [])

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="created-shell">
      <ModalLoading show={false}></ModalLoading>
      <NoSuchEvent show={false}></NoSuchEvent>
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
              <p id="created-description">{event.description !== "" ? event.description : "No event description was given."}</p>
            </div>
          </div>
          <div id="created-mid-right-section">
            <h3 className="created-mid-right-text">Nice work! Your event has been successfully created!</h3>
            <h3 className="created-mid-right-text">Copy the link below and send it to all prospective attendees!</h3>
            <h5 className="created-mid-right-reminder">Remember, all guests can see the availability of everyone else!</h5>
          </div>
          <div id="created-limeArrow-svg"></div>
        </div>
        <div id="created-bottom-section">
          <div id="created-limeArrow-svg"></div>
          <CopyLink></CopyLink>
          <div id="created-wallpaper"></div>
        </div>
    </motion.div>
  )
}

export default Created;