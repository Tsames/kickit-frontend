//Dependencies
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

//Import Components
import Calendar from '../input_components/Calendar';

//Styling
import '../../styles/page_styling/create.scss';

const Create = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  let navigate = useNavigate();

  const DEV_BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND + "events/";
  // const BACKEND_URL = process.env.REACT_APP_KICKIT_BACKEND + "events/";

  //State that stores input
  const [newForm, setNewForm] = useState({
    title: "",
    location: "",
    description: "",
    early: "1",
    late: "1",
    days: []
  });

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (#navbar-shell) Variant
  const containerVariant = {
    initial: { 
      scale: 0,
      x: "-50vw",
      y: "-50vh"
    },
    animate: {
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        when: "beforeChildren" 
      }
    }
  }

  //Child Variants
  const childVariant = {
    initial: { 
      opacity: 0 
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.6
      }
    }
  }

    /* --------------- Gestures --------------- */

  //Hover
  const buttonItemHover = {
    scale: 1.3,
    border: "solid",
    borderColor: "#818DFF",
    transition: {
      duration: 0.2,
    }
  }

  //Tap
  const buttonItemTap = {
    scale: 0.9,
    backgroundColor: "#2b37a5"
  }

  //In Viewport Variants
  const scrollVariant = {
    initial: { 
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.4
      }
    }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //Helper function (handleSubmit) - makes an HTTP Post request to the backend
  const createEvent = async (events) => {

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

  //Handler function - Updates form state
  const handleChange = (event) => {
    let newValue = event.target.value;
    setNewForm({ ...newForm, [event.target.name]: newValue });
  };

  const handleButtonChange = (event) => {
    let newEarly = Number(event.target.dataset.early);
    let newLate = Number(event.target.dataset.late);
    setNewForm({ ...newForm, "early": newEarly, "late": newLate });
  }

  //Handler function - Makes an HTTP Post request to the backend upon submission and redirects user to created page
  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = await createEvent(newForm);
    navigate(`/created/${id}`);
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */



  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-shell">
      <div id="create-section-top">
        <div id="create-section-top-left">
          <label htmlFor="title" id="create-title-wrapper" className="create-top-left-wrapper">
            <input required id="create-title" className="create-top-left-field" type="text" name="title" value={newForm.title} onChange={handleChange} />
          </label>
          <label htmlFor="location" id="create-location-wrapper" className="create-top-left-wrapper">
            <input required id="create-location" className="create-top-left-field" type="text" name="location" value={newForm.location} onChange={handleChange} />
          </label>
        </div>
        <div id="create-section-top-right">
        <label htmlFor="description" id="create-description-wrapper" className="create-top-right-wrapper">
          <textarea wrap="soft" required id="create-description" name="description" value={newForm.description} onChange={handleChange}/>
        </label>
        </div>
      </div>
      <div id="create-section-middle">
        <Calendar newForm={newForm} setNewForm={setNewForm} /> 
      </div>
      <div id="create-section-bottom">
        <div id="create-section-bottom-left">
          <h3 id="create-time-select-header">Time & Date</h3>
          <p id="create-time-select-secondary-text">Select all that apply</p>
          <div id="create-time-select-wrapper">
            <button type="" data-early="11" data-late="16" className="create-time-select-button" onClick={handleButtonChange}>11am - 4pm</button>
            <button data-early="16" data-late="21" className="create-time-select-button" onClick={handleButtonChange}>4pm - 9pm</button>
            <button data-early="21" data-late="2" className="create-time-select-button" onClick={handleButtonChange}>9pm - 2am</button>
            <button data-early="1" data-late="24" className="create-time-select-button" onClick={handleButtonChange}>Custom</button>
          </div>
        </div>
        <div id="create-section-bottom-right">
          <button id="create-submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Create;