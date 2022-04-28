//Dependencies
import { React, useState } from 'react';

//Styles
import '../styles/form.scss';

//Components
import Question from './small/Question';
import QuestionTA from './small/QuestionTA';
import TimeDropdown from './small/TimeDropdown';
import Calendar from './Calendar';

const CreateForm = (props) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/
  const URL = "http://localhost:3001/events";

  const [newForm, setNewForm] = useState({
    title: "",
    location: "",
    description: "",
    cost: "",
    early: "",
    late: "",
    days: ""
  });

  //Data that the calendar will use
  const [payload, setPayload] = useState([]);

  /* ------------------------------------------ Form Logic ------------------------------------------*/
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  const getCalendarData = () => {
    let newDays = "";
    payload.forEach((date) => {
      newDays.length === 0 ? newDays = newDays + date.toString() : newDays = newDays + ";" + date.toString();
    })
    setNewForm({ ...newForm, ["days"]: newDays });
  }

  const createEvent = async (events) => {
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPayload([]);
    createEvent(newForm);
    setNewForm({
      title: "",
      location: "",
      description: "",
      cost: "",
      early: "",
      late: "",
      days: ""
    });
    props.history.push("/")
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/
  return (
    <div className="createFormShell pageBody">
      <form className="createForm" onSubmit={handleSubmit}>
        <div className="createFormSectionLeft">
          <Question form="createForm" type="text" name="title" text="Name of Event:" value={newForm.title} doThis={handleChange} />
          <Question form="createForm" type="text" name="location" text="Location:" value={newForm.location} doThis={handleChange} />
          <QuestionTA form="createForm" rows="5" cols="10" name="description" text="Description of Event:" value={newForm.description} doThis={handleChange} />
          <Question form="createForm" type="text" name="cost" text="Cost:" value={newForm.cost} doThis={handleChange} />
        </div>
        <div className="createFormSectionRight">
          <div id="gridControls" className="createFormSubSection">
            <TimeDropdown form="createForm" name="early" text="No Earlier Than:" value={newForm.early} doThis={handleChange} />
            <TimeDropdown form="createForm" name="late" text="No Later Than:" value={newForm.late} doThis={handleChange} />
          </div>
          <Calendar payload={payload} setPayload={setPayload} getCalendarData={getCalendarData}/>
        </div>
        <Question form="createForm" type="submit" name="submit" text="" value="Submit" />
      </form>
    </div >
  )
}

export default CreateForm;