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
  checkEvent: (id: string) => Promise<boolean>;
  addAttendee: (newAttendee: attendingInterface) => Promise<void>
}

const Event: FC<eventProps> = ({ eventData, checkEvent, addAttendee }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  const params = useParams();

  //const DEV_BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND + "events/";
  // const BACKEND_URL = process.env.REACT_APP_KICKIT_BACKEND + "events/";

  //State that stores whether or not the params supplied point to a real event.
  const [verifiedEvent, setVerifiedEvent] = useState(false);

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

  useEffect(() => {
    console.log("Selection set to:")
    console.log(selection);
  }, [selection]);

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  const eventShellVariant={
    hidden: {

    },
    visible: {

    }
  }

  const submitButtonVariant = {
    inactive: {
      rotate: "0deg",
      transition: {
        type: "spring",
        dampning: 40,
        stiffness: 30
      }
    },
    valid: {
      rotate: "180deg",
      color: "#9AFF9E",
      transition: {
        type: "spring",
        dampning: 40,
        stiffness: 30
      }
    },
    invalid: {
      rotate: "-180deg",
      color: "#e95151",
      transition: {
        type: "spring",
        dampning: 40,
        stiffness: 30
      }
    }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Handles Name Change for the new Submissions
  const handleNameChange = (event: React.BaseSyntheticEvent): void => {
    let newValue = event.target.value;
    setSelection({ ...selection, "name": newValue });
  }

  //Handles submitting a new availability.
  const handleSubmit = (): void => {
    const newAttendee = { name: selection.name, available: selection.available};
    addAttendee(newAttendee);
    setSelection({ name: "",available: [], mouse: []})
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
            <div id="event-submission-text">
              <h1>Submit your availability</h1>
              <h6>Click and drag your cursor over the days and times that you are available to attend this event in the grid above. Then enter your name and click submit!</h6>
              <p>* If you submit using a name that already appears under "All Participants" section above you will overwrite their availability with your own.</p>
              <p>This is a great way to update your availability if needed, however if you just have the same name as someone else we recommend adding your last initial to differentiate yourself.</p>
            </div>
            <div id="event-submission-field">
                <motion.div id="event-submission-wrapper" variants={submitButtonVariant} initial="inactive" whileHover={selection.name !== "" && selection.available.length !== 0 ? "valid" : "invalid"} onClick={handleSubmit}><AiFillPlusCircle id="event-submission-button"></AiFillPlusCircle></motion.div>
                <label htmlFor="name" id="event-name-wrapper">
                  <input required id="event-name" type="text" name="name" value={selection.name} onChange={handleNameChange} />
                  <span className="placeholder no-select">Your name</span>
                </label>
            </div>
          </div>
        </motion.div>
    )
}

export default Event;