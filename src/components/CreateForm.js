//Dependencies
import { React, useState } from 'react';

//Styles
import '../styles/form.scss';

//Components
import Question from './small/Question';
import QuestionTA from './small/QuestionTA';
import TimeDropdown from './small/TimeDropdown';
import Grid from './Grid';

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
    days: "",
    late: "",
    image: "",
    organizer: "",
    attendees: []
  });

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
      days: "",
      image: "",
      organizer: "",
      attendees: []
    });
    props.history.push("/")
  }

  /* ------------------------------------------ Conditional Components ------------------------------------------*/

  const renderGrid = () => {
    if (newForm.days > 0 && (newForm.early !== "" && newForm.late !== "")) {
      return (
        <Grid early={newForm.early} late={newForm.late} days={newForm.days}/>
      )   
    } else if (newForm.days < 0 || newForm.days === "") {
      return (
        <h6>Enter a number of days greater than 0 for your event!</h6>
      )
    } else {
      return (
        <h6>Make sure you've entered a range of potential times for your event.</h6>
      )
    }
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/
  return (
    <div className={`${form}Shell`}>
      <form className={`${form}`} onSubmit={handleSubmit}>
        <div className={`${form}SectionOne`}>
          <Question form={form} type="text" name="title" text="Name of Event:" value={newForm.title} doThis={handleChange} />
          <Question form={form} type="text" name="location" text="Location:" value={newForm.location} doThis={handleChange} />
          <QuestionTA form={form} rows="5" cols="10" name="description" text="Description of Event:" value={newForm.description} doThis={handleChange} />
          <Question form={form} type="text" name="cost" text="Cost:" value={newForm.cost} doThis={handleChange} />
        </div>
        <div className={`${form}Section`}>
          <div id="gridControls" className={`${form}SubSection`}>
            <TimeDropdown form={form} name="early" text="No Earlier Than:" value={newForm.early} doThis={handleChange} />
            <TimeDropdown form={form} name="late" text="No Later Than:" value={newForm.late} doThis={handleChange} />
            <Question form={form} type="number" name="days" text="Number of Potential Days:" value={newForm.days} doThis={handleChange} />
          </div>
          {renderGrid()}
        </div>
        {/* <Question form={form} type="submit" name="submit" text="" value="Submit" /> */}
      </form>
    </div >
  )
}

export default CreateForm;