//Dependencies
import React, { FC, useState, useEffect } from "react";
import { motion } from 'framer-motion';

//Styling
import '../../../../styles/events_styling/event_styling/child_components/details.scss';

//Attending Interface
interface attendingInterface {
    name: string;
    available: Array<[number, number]>;
}

//Event Interface
interface eventDataInterface {
  _id: string;
  title: string;
  location: string;
  description: string;
  early: number;
  late: number;
  days: number[];
  attending: Array<attendingInterface>;
}

interface detailsProps {
  eventData: eventDataInterface;
}

const Details: FC<detailsProps> = ({ eventData }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //State that determines the state of the component
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect((): void => {
    console.log(`toggle is ${toggle}.`)
  }, [toggle]);

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */


  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

    return (
        <motion.div id="details-shell" className="">
            <div id="event-details-title-wrapper">
              <h3 id="event-details-title-label" className="event-details-label no-select">Title:</h3>
              <h3 id="event-details-title" className="event-details">{eventData.title}</h3>
            </div>
            <div id="event-details-location-wrapper">
              <h3 id="event-details-location-label" className="event-details-label no-select">Location:</h3>
              <h3 id="event-details-location" className="event-details">{eventData.location}</h3>
            </div>
            <div id="event-details-description-wrapper">
              <p id="event-details-description">{eventData.description !== "" ? eventData.description : "No event description was given."}</p>
            </div>
        </motion.div>
    )
}

export default Details;