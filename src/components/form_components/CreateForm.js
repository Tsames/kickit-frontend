//Dependencies
import { React, useState } from 'react';

//Styles
import '../../styles/form_styling/create_form.scss';

//Components
import Field from '../input_components/Field';
import TextArea from '../input_components/TextArea';
import TimeDropdown from '../input_components/TimeDropdown';
import Calendar from '../input_components/Calendar';

const CreateForm = ({ setRoot }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/
  setRoot("rb-create-event");


  const URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events";

  const [newForm, setNewForm] = useState({
    title: "",
    location: "",
    description: "",
    cost: "",
    early: "1",
    late: "1",
    days: []
  });

  /* ------------------------------------------ Form Logic ------------------------------------------*/
  const handleChange = (event) => {
    let newValue = event.target.value;
    if (event.target.name === "early" || event.target.name === "late") {
      newValue = Number(event.target.value)
    }
    setNewForm({ ...newForm, [event.target.name]: newValue });
  };

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
    createEvent(newForm);
    setNewForm({
      title: "",
      location: "",
      description: "",
      cost: "",
      early: "",
      late: "",
      days: []
    });
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/
  return (
    <div className="createFormShell pageBody">
      <form className="createForm" onSubmit={handleSubmit}>
        <div id="section-left" className="createForm-section">
          <Field form="createForm" type="text" name="title" text="Event Name" value={newForm.title} doThis={handleChange} />
          <Field form="createForm" type="text" name="location" text="Location" value={newForm.location} doThis={handleChange} />
          <TextArea form="createForm" rows="10" cols="30" name="description" text="Description" value={newForm.description} doThis={handleChange} />
          <Field form="createForm" type="text" name="cost" text="Cost" value={newForm.cost} doThis={handleChange} />
        </div>
        <div id="section-right" className="createForm-section">
          <div id="gridControls" className="subsection">
            <TimeDropdown form="createForm" name="early" text="No earlier than" value={newForm.early} doThis={handleChange} />
            <TimeDropdown form="createForm" name="late" text="No later than" value={newForm.late} doThis={handleChange} />
          </div>
          <Calendar newForm={newForm} setNewForm={setNewForm}/>
        </div>
        <Field form="createForm" type="submit" name="submit" text="" value="Submit" />
      </form>
    </div >
  )
}

export default CreateForm;