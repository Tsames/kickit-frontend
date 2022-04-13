//Dependencies
import { React, useState } from 'react';

//Styles
import '../styles/form.scss';

//Components
import Question from './small/Question';
import QuestionTA from './small/QuestionTA';
import TimeDropdown from './small/TimeDropdown';
import Grid from './Grid';

const Form = (props) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/
  const form = props.form;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createEvent(newForm);
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
  };

  /* ------------------------------------------ Different Types of Forms ------------------------------------------*/
  const createForm = () => {
    return (
      <form>
        <Question questionArray={["createForm", "text", "title", "Name of Event:", newForm.title, handleChange]}/>
        <Question questionArray={["createForm", "text", "location", "Location:", newForm.location, handleChange]}/>
        <QuestionTA questionArray={["createForm", [5,10], "description", "Description of Event:", newForm.description, handleChange]}/>
        <Question questionArray={["createForm", "text", "cost", "Cost:", newForm.cost, handleChange]}/>
        <TimeDropdown questionArray={["createForm", "early", "No Earlier Than:", newForm.early, handleChange]}/>
        <TimeDropdown questionArray={["createForm", "late", "No Later Than:", newForm.late, handleChange]}/>
        <Question questionArray={["createForm", "number", "days", "Number of Potential Days:", newForm.days, handleChange]}/>
      </form>
    )
  }

  const inputForm = () => {
    if (newForm.days > 0 && (newForm.early !== "" && newForm.late !== "")) {
      return (
        <Grid early={newForm.early} late={newForm.late} days={newForm.days}/>
      )   
    } else if (newForm.days < 0 || newForm.days === "") {
      return (
        <h4>Enter a number of days greater than 0 for your event!</h4>
      )
    } else {
      return (
        <h4>Make sure you've entered a time range for your event.</h4>
      )
    }
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/
  return (
    <div className={`${form}Shell`}>
      {createForm()}
      {inputForm()}
    </div >
  )
}

export default Form;