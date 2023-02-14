//Dependencies
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

//Import Components
import CreateTopSection from './child_components/createTopSection';
import Calendar from './child_components/calendar';
import CreateBottomSection from './child_components/createBottomSection.tsx';

//Styling
import '../../../styles/create_pages_styling/create_page/create.scss';

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

  //Handler function - Updates title, location, and description in newForm state 
  const handleChange = (event) => {
    let newValue = event.target.value;
    setNewForm({ ...newForm, [event.target.name]: newValue });
  };

  //Handler function - Updates early and late in newForm state
  const handleTimeSelect = (event) => {
    let newEarly = Number(event.target.dataset.early);
    let newLate = Number(event.target.dataset.late);
    event.target.classList.add("button-selected");
    setNewForm({ ...newForm, "early": newEarly, "late": newLate });
  }

  //Handler function - Makes an HTTP Post request to the backend upon submission and redirects user to created page
  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = await createEvent(newForm);
    navigate(`/created/${id}`);
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  const displayCreate = () => {
    return (
      <>
        <CreateTopSection newForm={newForm} handleChange={handleChange} />
        <div id="create-middle-section">
          <Calendar newForm={newForm} setNewForm={setNewForm} />
        </div>
        <CreateBottomSection handleTimeSelect={handleTimeSelect} handleSubmit={handleSubmit} />
      </>
    )
  }

  const displayProcessing = () => {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-shell">
      {displayCreate()}
    </div>
  )
}
