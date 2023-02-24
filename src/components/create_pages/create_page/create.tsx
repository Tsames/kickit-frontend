//Dependencies
import React, { FC, MouseEvent, ChangeEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

//Import Components
import CreateTopSection from './child_components/createTopSection';
import Calendar from './child_components/calendar';
import CreateBottomSection from './child_components/createBottomSection';

//Styling
import '../../../styles/create_pages_styling/create_page/create.scss';

interface createProps {
  getEventData: (id : string) => Promise<boolean>
}

const Create: FC<createProps> = ({ getEventData }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  let navigate = useNavigate();

  const DEV_BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND + "events/";
  // const BACKEND_URL = process.env.REACT_APP_KICKIT_BACKEND + "events/";

  //Interface for newForm State
  interface newFormInterface {
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
  }

  //State that stores input
  const [newForm, setNewForm] = useState<newFormInterface>({
    title: "",
    location: "",
    description: "",
    early: 0,
    late: 0,
    days: []
  });

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  const createPageVariant = {
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

  const getCalendarHelperColor = () => {
    if (newForm.days.length === 5) {
      return "calendar-counter-maxed no-select";
    } else if (newForm.days.length > 2) {
      return "calendar-counter-some no-select";
    } else {
      return "no-select";
    }
  }


  //Helper function (handleSubmit) - makes an HTTP Post request to the backend
  const createEvent = async () => {

    //Send HTTP Post Request to backend and save response
    const response = await fetch(DEV_BACKEND_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newForm),
    });

    //Get the Id of the newly created Event and return it
    const newData = await response.json();
    return newData._id;
  };

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Handler function - Updates title, location, and description in newForm state 
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) : void => {
    let newValue = event.target.value;
    setNewForm({ ...newForm, [event.target.name]: newValue });
  };

  //Handler function - Updates early and late in newForm state
  const handleTimeSelect = (event : MouseEvent<HTMLButtonElement>) :void => {

    //Grab element
    const element = event.target as HTMLButtonElement
    const dataset = element.dataset;
    const classList = element.classList;

    let newEarly = Number(dataset.early);
    let newLate = Number(dataset.late);
    classList.add("button-selected");
    setNewForm({ ...newForm, "early": newEarly, "late": newLate });
  }

  //Handler function - Makes an HTTP Post request to the backend upon submission and redirects user to created page
  const handleSubmit = async () :Promise<void> => {
    const id = await createEvent();
    navigate(`/created/${id}`);
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="create-shell" variants={createPageVariant} initial="hidden" animate="visible" exit="exit">
        <CreateTopSection newForm={newForm} handleChange={handleChange} />
        <div id="create-middle-section">
          <div id="calendarCounter" className={getCalendarHelperColor()}> {newForm.days.length} / 5</div>
          <Calendar newForm={newForm} setNewForm={setNewForm} />
        </div>
        <CreateBottomSection newForm={newForm} handleTimeSelect={handleTimeSelect} handleSubmit={handleSubmit} />
    </motion.div>
  )
}

export default Create;