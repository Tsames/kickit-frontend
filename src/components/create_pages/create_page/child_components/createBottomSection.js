//Dependencies
import { React } from 'react';
import { motion } from 'framer-motion';

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/createBottomSection.scss';

const CreateBottomSection = ({ handleTimeSelect, handleSubmit}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Hover
  const buttonHover = {
    scale: 1.05,
    backgroundColor: "#d0d1d6",
    transition: {
      duration: 0.2,
    }
  }

  //Tap
  const buttonTap = {
    scale: 0.9,
    color: "#ECECEC",
    backgroundColor: "#9b9da3"
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

    //Send data to state in create.js
    handleTimeSelect(event);
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-bottom-section">
      <div id="create-bottom-left-subsection">
        <div id="create-bottom-left-text-subsection">
          <h3 id="create-time-select-header">Time & Date</h3>
          <p id="create-time-select-secondary-text">Select all that apply</p>
        </div>
        <div id="create-time-select-wrapper">
          <motion.button data-early="11" data-late="16" className="create-time-select-button" whileHover={buttonHover}  whileTap={buttonTap} onClick={handleButton}>11am - 4pm</motion.button>
          <motion.button data-early="16" data-late="21" className="create-time-select-button" whileHover={buttonHover} whileTap={buttonTap} onClick={handleButton}>4pm - 9pm</motion.button>
          <motion.button data-early="21" data-late="2" className="create-time-select-button" whileHover={buttonHover}  whileTap={buttonTap} onClick={handleButton}>9pm - 2am</motion.button>
          <motion.button data-early="1" data-late="24" className="create-time-select-button" whileHover={buttonHover} whileTap={buttonTap}>Custom</motion.button>
        </div>
      </div>
      <div id="create-bottom-right-subsection">
        <div id="create-person-graphic"></div>
        <button id="create-submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default CreateBottomSection;