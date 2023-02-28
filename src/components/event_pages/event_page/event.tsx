//Dependencies
import React, { FC, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

//Import Components
import Availability from "./child_components/availability";'./child_components/availability';

//Styling
import '../../../styles/create_pages_styling/create_page/create.scss';

//Attending Interface
interface attendingInterface {
    name: string;
    available: Array<[number, number, number]>;
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

interface eventProps {
  eventData: eventDataInterface;
  setEvent: (event: eventDataInterface) => void;
  getEventData: (id: string) => Promise<boolean>;
}

const Event: FC<eventProps> = ({ eventData, setEvent, getEventData }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  let navigate = useNavigate();

  const DEV_BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND + "events/";
  // const BACKEND_URL = process.env.REACT_APP_KICKIT_BACKEND + "events/";

  //State that stores input
  const [selection, setSelection] = useState<attendingInterface>({
    name: "",
    available: []
  });

  useEffect(() => {
    console.log("selection has been updated to:");
    console.log(selection);
  }, [selection])

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  const eventPageVariant = {
    hidden: {
      y: "-100vw"
    },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15}
    },
    exit: {
    }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="event-shell">
        <Availability eventData={eventData} selection={selection} setSelection={setSelection}/>
    </motion.div>
  )
}

export default Event;