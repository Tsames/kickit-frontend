//Dependencies
import React, { FC, useState, useEffect } from "react";
import { motion } from 'framer-motion';

//Styling
import '../../../../styles/events_styling/event_styling/child_components/participants.scss';

//Limit Interface
interface limitInterface {
    active: boolean;
    name: string;
}

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

interface participantsProps {
    limit: limitInterface;
    mouse: Array<string>;
    setLimit: React.Dispatch<React.SetStateAction<limitInterface>>;
    eventData: eventDataInterface;
}

const Participants: FC<participantsProps> = ({ limit, mouse, setLimit, eventData }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */


  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  const wrapperVariant = {
        
  }

  const indicatorVariant = {
    "active": {
        backgroundColor: "#51D245",
        transiton: {duration: 0.3}
    },
    "inactive": {
        backgroundColor: "#00000000",
        transiton: {duration: 0.3}
    }
  }

  const textVariant = {

  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  const determineVisibility = (elementName: string): boolean => {

    if (limit.active && limit.name === elementName) {
        return true;
    } else if (limit.active && limit.name !== elementName) {
        return false;
    } else if (mouse.length === 0) {
        return true;
    } else {
        return mouse.includes(elementName);
    }
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  const handleSetLimit = (event: React.BaseSyntheticEvent): void => {

    const targetName = event.target.dataset.name;

    //If there is an active limit and user is clicking on the name of the active limit
    if (limit.name === targetName && limit.active === true) {
        setLimit({...limit, active: false});

    //Else if the user clicks on a name that isn't the limit, make that the new limit
    } else if (limit.name !== targetName) {
        setLimit({ active: true, name: targetName});
    }
  }

  /* ------------------------------------------ JSX Generator Functions ------------------------------------------ */

    const generateNames = (): Array<React.ReactElement> => {

        const content: Array<React.ReactElement> = [];

        eventData.attending.forEach( attendObject => {

            content.push(
                <motion.div id={`${attendObject.name}-wrapper`} key={`${attendObject.name}`} className="participants-name-wrapper" data-name={attendObject.name} onClick={handleSetLimit}>
                    <motion.div id={`${attendObject.name}-indicator`} className={determineVisibility(attendObject.name) ? "participants-name-indicator selected" : "participants-name-indicator not-selected"}></motion.div>
                    <motion.p id={`${attendObject.name}-text`} className={determineVisibility(attendObject.name) ? "participants-name-text selected no-select" : "participants-name-text not-selected no-select"}>{attendObject.name}</motion.p>
                </motion.div>
            );
        })

        return content;

    }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

    return (
        <motion.div id="participants-shell">
            <h1>All Participants</h1>
            <h3 className={eventData.attending.length === 0 ? "" : "not-applicable"}>No one is signed up yet. Be the first to submit your availability!</h3>
            <div id="participants-body">
                {generateNames()}
            </div>
        </motion.div>
    )
}

export default Participants;