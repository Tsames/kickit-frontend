//Dependencies
import React, { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiFillPlusCircle } from "react-icons/ai";

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
  setEvent: (event: eventDataInterface) => void;
  checkEvent: (id: string) => Promise<boolean>;
}

const Event: FC<eventProps> = ({ eventData, setEvent, checkEvent }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  const params = useParams();

  //const DEV_BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND + "events/";
  // const BACKEND_URL = process.env.REACT_APP_KICKIT_BACKEND + "events/";

  //State that stores whether or not the params supplied point to a real event.
  const [verifiedEvent, setVerifiedEvent] = useState(false);

  //State for submission dropdown-menu management
  const [toggle, setToggle] = useState<boolean>(false);

  //State for Participants and Availability child components to determine whether it should only show a select person's availability
  const [limit, setLimit] = useState<limitInterface>({
    active: false,
    name: ""
  });

  //State that stores selection input for Availability.tsx and bottom section of this component
  const [selection, setSelection] = useState<selectionInterface>({
    name: "",
    available: [],
    mouse: []
  });

  /* UseEffect defines an asynchronos function which will save a boolean to verifiedEvent based on
  whether the params represent the id of a real event in the database. */
  useEffect(() => {

    const checkData = async () => {

      let id = params.id as string;

      try {
        setVerifiedEvent(await checkEvent(id));
      } catch {
        setVerifiedEvent(false);
      }
    }

    checkData();
    
  }, []);

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  const eventSusectionVariant = {
    inactive: {
      backgroundColor: "#00000000",
      transition: { duration: 0.3, delay: 0.3 }
    },
    active: {
      backgroundColor: "#FAF9F6",
      transition: { duration: 0.3 }
    }
  }

  const eventHeaderVariant = {
    inactive: {
      backgroundColor: "#FAF9F6",
      transition: { duration: 0.3, delay: 0.3 }
    },
    active: {
      backgroundColor: "#C2C2C2",
      transition: { duration: 0.3 }
    }
  }

  const eventBodyVariant = {
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

  const eventToggleButtonVariant = {
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
            <div id="event-graphic"></div>
            <div id="event-submission-subsection">
              <motion.div id="event-submission-subsection-header" variants={eventToggleButtonVariant} initial={false} animate={toggle ? "active" : "inactive"}>
                <motion.div id="event-submission-subsection-toggle-button-wrapper" variants={eventToggleButtonVariant} onClick={() => {toggle ? setToggle(false) : setToggle(true)}}><AiFillPlusCircle id="details-toggle-button"></AiFillPlusCircle></motion.div>
              </motion.div>
              <motion.div id="event-submission-subsection-body" variants={eventBodyVariant}>
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
              </motion.div>
            </div>
          </div>
        </motion.div>
    )
}

export default Event;