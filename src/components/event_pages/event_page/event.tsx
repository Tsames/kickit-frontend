//Dependencies
import React, { FC, useState, useEffect } from "react";
import { motion } from 'framer-motion';

//Import Components
import Details from './child_components/details';
import Participants from "./child_components/participants";
import Availability from "./child_components/availability";

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

//Selection Interface
interface selectionInterface {
  name: string;
  available: Array<[number, number]>;
  mouse: Array<string>;
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

  //State for Participants and Availability child components to determine whether it should only show a select person's availability
  const [limit, setLimit] = useState<limitInterface>({
    active: false,
    name: ""
  });

  //State that stores selection input
  const [selection, setSelection] = useState<selectionInterface>({
    name: "",
    available: [],
    mouse: []
  });

  useEffect((): void => {
    console.log("selection is:");
    console.log(selection);
  }, [selection]);

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

  //Handles Name Change for the new Submissions
  const handleNameChange = (event: React.BaseSyntheticEvent): void => {
    let newValue = event.target.value;
    setSelection({ ...selection, "name": newValue });
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

    return (
        <motion.div id="event-shell">
          <div id="event-top-section">
            <Details eventData={eventData} />
            <Participants limit={limit} mouse={selection.mouse} setLimit={setLimit} eventData={eventData}/>
            <Availability limit={limit} eventData={eventData} selection={selection} setSelection={setSelection}/>
          </div>
          <div id="event-bottom-section">
            <div id="person=graphic"></div>
            <h2>Select all of the times that you are available on any of the above days.</h2>
            <div id="event-warning">
              <p>You are entering a name that has already submitted their availability.</p>
              <p>If you submit with this name, you will overwrite the previously submitted availability.</p>
            </div>
            <label htmlFor="name" id="event-name-wrapper">
              <input required id="event-name" type="text" name="name" value={selection.name} onChange={handleNameChange} />
              <span className="placeholder no-select">enter name</span>
            </label>
            <button>Submit</button>
          </div>
        </motion.div>
    )
}

export default Event;