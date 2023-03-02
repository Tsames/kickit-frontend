//Dependencies
import React, { FC, useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { VscTriangleDown } from "react-icons/vsc";

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

  const detailsShellVariant = {
    inactive: {
        transition: { duration: 0.3, delay: 0.3 }
    },
    active: {
        transition: { duration: 0.3 }
    }
  }

  const detailsHeaderVariant = {
    inactive: {
        backgroundColor: "#FAF9F6",
        transition: { duration: 0.3, delay: 0.3 }
    },
    active: {
        backgroundColor: "#C2C2C2",
        transition: { duration: 0.3 }
    }
  }

  const detailsBodyVariant = {
    inactive: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, delay: 0.3 }
    },
    active: {
      opacity: 1,
      height: "calc(82% - (2rem + 2vw))",
      transition: { duration: 0.3 }
    }
  }

  const detailsToggleButtonVariant = {
    inactive: {
        rotateZ: "90deg",
        transition: { duration: 0.3, delay: 0.3 }
    },
    active: {
        rotateZ: "0deg",
        transition: { duration: 0.3 }
    }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  const toggleDetails = () => {

  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

    return (
        <motion.div id="details-shell" variants={detailsShellVariant} initial={false} animate={toggle ? "active" : "inactive"}>
            <motion.div id="details-header" variants={detailsHeaderVariant} initial={false} animate={toggle ? "active" : "inactive"}>
                <h1 id="details-event-title">{eventData.title}</h1>
                <motion.div id="details-toggle-button-wrapper" variants={detailsToggleButtonVariant} onClick={() => {toggle ? setToggle(false) : setToggle(true)}}><VscTriangleDown id="details-toggle-button"></VscTriangleDown></motion.div>
            </motion.div>
            <motion.div id="details-body" variants={detailsBodyVariant} initial={false} animate={toggle ? "active" : "inactive"}>
                <div id="event-details-location-wrapper">
                    <h3 id="event-details-location-label" className="event-details-label no-select">Location:</h3>
                    <h3 id="event-details-location" className="event-details">{eventData.location}</h3>
                </div>
                <div id="event-details-description-wrapper">
                    <p id="event-details-description">{eventData.description !== "" ? eventData.description : "No event description was given."}</p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Details;