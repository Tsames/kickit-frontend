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
  const form = "createForm";
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

  if (newForm.days.length > 0) {
    console.log(typeof(newForm.days[0]));
  }
  console.log(newForm);

  /* ------------------------------------------ Form Logic ------------------------------------------*/
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
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
      days: ""
    });
    props.history.push("/")
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/
  return (
    <div className={`${form}Shell`}>
      <form className={`${form}`} onSubmit={handleSubmit}>
        <div className={`${form}SectionLeft`}>
          <Question form={form} type="text" name="title" text="Name of Event:" value={newForm.title} doThis={handleChange} />
          <Question form={form} type="text" name="location" text="Location:" value={newForm.location} doThis={handleChange} />
          <QuestionTA form={form} rows="5" cols="10" name="description" text="Description of Event:" value={newForm.description} doThis={handleChange} />
          <Question form={form} type="text" name="cost" text="Cost:" value={newForm.cost} doThis={handleChange} />
        </div>
        <div className={`${form}SectionRight`}>
          <div id="gridControls" className={`${form}SubSection`}>
            <TimeDropdown form={form} name="early" text="No Earlier Than:" value={newForm.early} doThis={handleChange} />
            <TimeDropdown form={form} name="late" text="No Later Than:" value={newForm.late} doThis={handleChange} />
          </div>
          <Calendar getCalendarData={getCalendarData} />
        </div>
        <Question form={form} type="submit" name="submit" text="" value="Submit" />
      </form>
    </div >
  )
}

export default CreateForm;