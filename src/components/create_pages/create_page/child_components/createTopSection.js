//Dependencies
import { React } from 'react';
// import { motion } from 'framer-motion';

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/createTopSection.scss';

const CreateTopSection = ({newForm, handleChange}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-top-section">
      <div id="create-top-left-subsection">
        <label htmlFor="title" id="create-title-wrapper" className="create-top-left-wrapper">
          <input required id="create-title" className="create-top-left-field" type="text" name="title" value={newForm.title} placeholder="Enter Event Title..." onChange={handleChange} />
        </label>
        <label htmlFor="location" id="create-location-wrapper" className="create-top-left-wrapper">
          <input required id="create-location" className="create-top-left-field" type="text" name="location" value={newForm.location} placeholder="Event Location..." onChange={handleChange} />
        </label>
      </div>
        <label htmlFor="description" id="create-description-wrapper" className="create-top-right-wrapper">
          <textarea wrap="soft" required id="create-description" name="description" value={newForm.description} placeholder="Enter a description of your event..." onChange={handleChange} />
        </label>
    </div>
  )
}

export default CreateTopSection;