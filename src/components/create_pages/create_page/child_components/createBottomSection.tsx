//Dependencies
import React, { FC, MouseEvent, ChangeEvent, useState } from "react";
import { motion } from 'framer-motion';

//Import Components
import SelectTime from './selectTime'

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/createBottomSection.scss';

//Props Interface
interface CBSProps {
  newForm: {
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
  };
  handleTimeSelect: (event : MouseEvent<HTMLButtonElement>) => void;
  handleSubmit: () => Promise<void>;
}

const CreateBottomSection: FC<CBSProps> = ({ newForm, handleTimeSelect, handleSubmit }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //State that stores toggle data for custom time and loading screen
  const [toggle, setToggle] = useState<boolean>(false);

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  const parentVariant = {
    inactive: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.3 }
    },
    active: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  const childVariant = {
    inactive: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 50 }
    },
    active: {
      y: -100,
      transition: { type: "spring", stiffness: 400, damping: 50, delay: 0.3 }
    }
  }

  //Hover
  const timeButtomHover = {
    scale: 1.05,
    backgroundColor: "#BEC9FF",
    transition: {
      duration: 0.2,
    }
  }

  const submitButtonHover = {
    scale: 1.3,
    border: "solid",
    borderColor: "#818DFF",
    transition: {
      duration: 0.2,
    }
  }

  //Tap
  const timeButtonTap = {
    scale: 0.9,
    color: "#014D59",
    borderWidth: "0.2vw",
    backgroundColor: "#D7FFB7",
    transition: {
      duration: 0.3
    }
  }

  const submitButtonTap = {
    scale: 0.9,
    backgroundColor: "#2b37a5"
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //Helper function - determines the helper submit text that needs to be displayed in the chat bubble.
  const determineChatBubble = () :string => {
    const checkArray = [];
    let outputString = "You still need to";

    if(newForm.title === "") checkArray.push(0);
    if(newForm.location === "") checkArray.push(1);
    if(newForm.days.length === 0) checkArray.push(2);
    if(newForm.early === 0 || newForm.late === 0) checkArray.push(3);

    if(checkArray.length === 0) {
      return "You're ready to create your event. Make sure all the details are correct before submitting. Once you submit you cannot edit your event."
    }

    //Title
    if (newForm.title === "" && checkArray.length > 2) {
      outputString += " enter a title,"
    } else if (newForm.title === ""){
      outputString += " enter a title"
    }

    //Location
    if (newForm.location == "" && checkArray.length > 2) {
      outputString += " enter a location,";
    } else if (newForm.location === "" && (checkArray.length == 2 && checkArray.includes(0))) {
      outputString += " and enter a location"
    } else if (newForm.location === "") {
      outputString += " enter a location"
    }

    //Days
    if (newForm.days.length == 0 && ((checkArray.length === 3 && checkArray.includes(3)) || checkArray.length === 4)) {
      outputString += " enter at least one day,";
    } else if (newForm.days.length === 0 && ((checkArray.length === 3 || checkArray.length === 2) && !checkArray.includes(3))) {
      outputString += " and enter at least one day"
    } else if (newForm.days.length === 0) {
      outputString += " enter at least one day"
    }

    //Time
     if ((newForm.early === 0 || newForm.late === 0) && checkArray.length >= 2) {
      outputString += " and enter a time range"
    } else if (newForm.early === 0 || newForm.late === 0) {
      outputString += " enter a time range"
    }

    outputString += " for your event before submitting."

    return outputString
  }

  /* Helper function - determines whether #create-time-select-warning needs to be shown or not 
  Days are considered to start at 5am (5) and end at 4am (4). This means that 4 is later than 24 (12 am) */
  const determineValidTimeSelect = () => {

    //If both early and late are less than 5 AND late is less than or equal to early, then the selection is invalid. 
    if ((newForm.early < 5 && newForm.late < 5) && newForm.late <= newForm.early) {
      return false;

    //If both early and late are greater than or equal to 5 and late is less than or equal to early, then the selection is invalid.
    } else if ((newForm.early >= 5 && newForm.late >= 5) && newForm.late <= newForm.early) {
      return false;

    //If early is greater than or equal to 5 and late is less than 5, then the selection is invalid.
    } else if (newForm.early < 5 && newForm.late >= 5) {
      return false;

    //Otherwise, the selection is valid.
    } else {

      return true;
    }
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  const handleButton = (event: MouseEvent<HTMLButtonElement>) :void => {

    //Grab parent element
    const element = event.target as HTMLButtonElement
    const className = element.parentElement;
    const classList = element.classList;
    const wrapper = element.childNodes;

    //Iterate through children of parent and remove class
    wrapper.forEach((child : any) => {
      child.classList.remove("button-selected");
    });

    //Add class to selected button
    classList.add("button-selected");

    if (toggle) {
      setToggle(false);
    }

    //Send data to state in create.js
    handleTimeSelect(event);
  }

  const handleCustomTime = (event : MouseEvent<HTMLButtonElement>) :void => {
    handleButton(event);
    setToggle(true);
  }

  const handleCheckSubmit = () :void => {
    //If all required fields are completed -  then submit
    if (newForm.title !== "" && newForm.location !== "" && newForm.days.length !== 0 && newForm.late !== 0 && newForm.late !== 0) {
      handleSubmit();
    //Otherwise draw attention to chat bubble and play button animation.
    } else {

    }
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-bottom-section">
      <div id="create-bottom-left-subsection">
        <motion.h3 id="create-time-select-warning" className="invisible no-select">Your custom range selection does not make sense. Please make sure the start time is earlier than the end time. Days are considered to start at 5am and end at 4am to account for late night events.</motion.h3>
        <motion.h3 id="create-time-select-header" variants={parentVariant} initial={false} animate={toggle ? "active" : "inactive"}>Time Range</motion.h3>
        <motion.p id="create-time-select-secondary-text" variants={parentVariant} initial={false} animate={toggle ? "active" : "inactive"}>Pick a preset, or make your own custom range.</motion.p>
        <motion.div id="create-time-select-wrapper" variants={childVariant} initial={false} animate={toggle ? "active" : "inactive"}>
          <motion.button data-early="11" data-late="16" className="create-time-select-button" whileHover={timeButtomHover}  whileTap={timeButtonTap} onClick={handleButton}>11am - 4pm</motion.button>
          <motion.button data-early="16" data-late="21" className="create-time-select-button" whileHover={timeButtomHover} whileTap={timeButtonTap} onClick={handleButton}>4pm - 9pm</motion.button>
          <motion.button data-early="21" data-late="2" className="create-time-select-button" whileHover={timeButtomHover}  whileTap={timeButtonTap} onClick={handleButton}>9pm - 2am</motion.button>
          <motion.button data-early="0" data-late="0" className="create-time-select-button" whileHover={timeButtomHover} whileTap={timeButtonTap} onClick={handleCustomTime}>Custom</motion.button>
          <SelectTime elementId="select-time-early" toggle={toggle} text="Start"></SelectTime>
          <SelectTime elementId="select-time-late" toggle={toggle} text="End"></SelectTime>
        </motion.div>
      </div>
      <div id="create-bottom-right-subsection">
        <div id="create-submit-text-bubble">
          <p id="create-submit-text" className="no-select">{determineChatBubble()}</p>
        </div>
        <div id="create-submit-text-bubble-tail"></div>
        <div id="create-person-graphic"></div>
        <motion.button id="create-submit" whileHover={submitButtonHover} whileTap={submitButtonTap} onClick={handleCheckSubmit}>Done</motion.button>
      </div>
    </div>
  )
}

export default CreateBottomSection;