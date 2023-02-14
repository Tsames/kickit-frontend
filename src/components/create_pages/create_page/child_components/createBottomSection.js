//Dependencies
import { React, useState } from 'react';
import { motion } from 'framer-motion';

//Import Components
import SelectTime from './selectTime'

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/createBottomSection.scss';

const CreateBottomSection = ({ handleTimeSelect, handleSubmit, early, late }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //State that stores toggle data for custom time and loading screen
  const [toggle, setToggle] = useState(false);

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
      y: "-15vw",
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
    borderWidth: "calc(1rem, 1.5vw)",
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


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  const handleButton = (event) => {
    //Grab parent element
    const wrapper = event.target.parentElement.childNodes;

    //Iterate through children of parent and remove class
    wrapper.forEach((child) => {
      child.classList.remove("button-selected");
    });

    //Add class to selected button
    event.target.classList.add("button-selected");

    if (toggle) {
      setToggle(false);
    }

    //Send data to state in create.js
    // handleTimeSelect(event);
  }

  const handleCustomTime = (event) => {
    handleButton(event);
    setToggle(true);
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-bottom-section">
      <div id="create-bottom-left-subsection">
        <motion.h3 id="create-time-select-header" variants={parentVariant} initial={false} animate={toggle ? "active" : "inactive"}>Time & Date</motion.h3>
        <motion.p id="create-time-select-secondary-text" variants={parentVariant} initial={false} animate={toggle ? "active" : "inactive"}>Pick a preset, or make your own custom range.</motion.p>
        <motion.div id="create-time-select-wrapper" variants={childVariant} initial={false} animate={toggle ? "active" : "inactive"}>
          <motion.button data-early="11" data-late="16" className="create-time-select-button" whileHover={timeButtomHover}  whileTap={timeButtonTap} onClick={handleButton}>11am - 4pm</motion.button>
          <motion.button data-early="16" data-late="21" className="create-time-select-button" whileHover={timeButtomHover} whileTap={timeButtonTap} onClick={handleButton}>4pm - 9pm</motion.button>
          <motion.button data-early="21" data-late="2" className="create-time-select-button" whileHover={timeButtomHover}  whileTap={timeButtonTap} onClick={handleButton}>9pm - 2am</motion.button>
          <motion.button data-early="1" data-late="24" className="create-time-select-button" whileHover={timeButtomHover} whileTap={timeButtonTap} onClick={handleCustomTime}>Custom</motion.button>
          <SelectTime id="select-time-early" toggle={toggle} early={early} late={late} text="Start"></SelectTime>
          <SelectTime id="select-time-late" toggle={toggle} early={early} late={late} text="End"></SelectTime>
        </motion.div>
      </div>
      <div id="create-bottom-right-subsection">
        <div id="create-submit-text-bubble">
          <p id="create-submit-text" className="no-select">Once you’ve selected your favored time and up to 5 days, click done to generate your event!</p>
        </div>
        <div id="create-submit-text-bubble-tail"></div>
        <div id="create-person-graphic"></div>
        <motion.button id="create-submit" whileHover={submitButtonHover} whileTap={submitButtonTap} onClick={handleSubmit}>Done</motion.button>
      </div>
    </div>
  )
}

export default CreateBottomSection;