//Dependencies
import { React, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

//Import Components
// import Field from '../input_components/Field';
// import TextArea from '../input_components/TextArea';
// import TimeDropdown from '../input_components/TimeDropdown';
import Calendar from '../input_components/Calendar';

//Styling
import '../../styles/page_styling/create.scss';

const Create = ({ event, getEventData, FRONTEND_URL, BACKEND_URL}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  // let navigate = useNavigate();

  // //stores the events the search returns
  // let result = null;

  // const SEARCH_URL = BACKEND_URL + "search/"

  // //Set root style based on page
  // useEffect(() => {
  //   document.getElementById('root').className = 'rb-create';
  // });

  //State that stores input
  const [newForm, setNewForm] = useState({
    title: "",
    location: "",
    description: "",
    early: "1",
    late: "1",
    days: []
  });

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  // const searchEvents = async () => {
  //   try {
  //     //Fetch event data
  //     const response = await fetch(SEARCH_URL);
  //     const data = await response.json()

  //     console.log("success");
  //     console.log(data);

  //     //Set event state
  //     result = data;

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // //Helper function (handleSubmit) - makes an HTTP Post request to the backend
  // const createEvent = async (events) => {
  //   await fetch(BACKEND_URL, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(events),
  //   });
  // };

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Handler function - Updates form state
  const handleChange = (event) => {
    let newValue = event.target.value;
    if (event.target.name === "early" || event.target.name === "late") {
      newValue = Number(event.target.value)
    }
    setNewForm({ ...newForm, [event.target.name]: newValue });
  };

  // //Handler function - Resets state and makes an HTTP Post request to the backend upon submission
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(newForm);
  //   createEvent(newForm);
  //   // searchEvents(newForm.title);
  //   // console.log(result);
  //   // useNavigate(`/created/${result.id}`);
  // }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-shell">
      <form>
        <div id="create-section-top">
          
        </div>
        <div id="create-section-middle">
          <Calendar newForm={newForm} setNewForm={setNewForm} /> 
        </div>
        <div id="create-section-bottom">

        </div>
      </form>
    </div>
  )
}

export default Create;