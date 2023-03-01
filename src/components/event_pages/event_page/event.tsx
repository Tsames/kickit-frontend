//Dependencies
import React, { FC, useState, useEffect } from "react";
import { motion } from 'framer-motion';

//Import Components
import Availability from "./child_components/availability";'./child_components/availability';

//Styling
import '../../../styles/events_styling/event_styling/event.scss';

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

interface eventProps {
  eventData: eventDataInterface;
//   setEvent: (event: eventDataInterface) => void;
//   getEventData: (id: string) => Promise<boolean>;
}

const Event: FC<eventProps> = ({ eventData }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

    //const DEV_BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND + "events/";
    // const BACKEND_URL = process.env.REACT_APP_KICKIT_BACKEND + "events/";

    //State for availability.tsx to determine whether it should only show a select person's availability
    const [limit, setLimit] = useState<limitInterface>({
        active: false,
        name: ""
    })

    //State that stores selection input
    const [selection, setSelection] = useState<attendingInterface>({
        name: "Jack",
        available: [[1,2]],
    });

    // useEffect((): void => {
    //     console.log("selection is:");
    //     console.log(selection);

    //     console.log("limit is:")
    //     console.log(limit);

    // }, [selection, limit]);

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

//   const eventPageVariant = {
//     hidden: {
//       y: "-100vw"
//     },
//     visible: {
//       y: 0,
//       transition: { type: "spring", stiffness: 80, damping: 15}
//     },
//     exit: {
//     }
//   }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

    return (
        <motion.div id="event-shell">
            <Availability limit={limit} eventData={eventData} selection={selection} setSelection={setSelection}/>
        </motion.div>
    )
}

export default Event;