//Dependencies
import { React } from 'react';
// import { motion } from 'framer-motion';

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/createBottomSection.scss';

const CreateBottomSection = ({ handleTimeSelect, handleSubmit}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-bottom-section">
      <div id="create-bottom-left-subsection">
        <h3 id="create-time-select-header">Time & Date</h3>
        <p id="create-time-select-secondary-text">Select all that apply</p>
        <div id="create-time-select-wrapper">
          <button type="" data-early="11" data-late="16" className="create-time-select-button" onClick={handleTimeSelect}>11am - 4pm</button>
          <button data-early="16" data-late="21" className="create-time-select-button" onClick={handleTimeSelect}>4pm - 9pm</button>
          <button data-early="21" data-late="2" className="create-time-select-button" onClick={handleTimeSelect}>9pm - 2am</button>
          <button data-early="1" data-late="24" className="create-time-select-button">Custom</button>
        </div>
      </div>
      <div id="create-bottom-right-subsection">
        <button id="create-submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default CreateBottomSection;