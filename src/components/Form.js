//Dependencies
import { React, useState } from 'react';

//Styles
import '../styles/form.scss';

//Components
import Grid from './Grid';
import TimeDropdown from './small/TimeDropdown';
import Question from './small/Question';

const Form = (props) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/
  const form = props.form;

  const [newForm, setNewForm] = useState({
    name: "",
    location: "",
    cost: "",
    description: "",
    startRange: "",
    endRange: "",
    early: "",
    late: "",
    image: "",
    organizer: "",
    attendees: []
  });

  console.log(newForm);

  /* ------------------------------------------ Form Logic ------------------------------------------*/
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createEvent(newForm);
    setNewForm({
      name: "",
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
        <div className={`${form}Block`}>
          <label for="name" className={`${form}Label`}>Name of Event</label><br/>
          <input id={`${form}Name`} className={`${form}Input`} type="text" name="name" value={newForm.name} onChange={handleChange}/>
        </div>
        <div className={`${form}Block`}>
          <label for="eventLocation" className={`${form}Label`}>Location</label><br/>
          <input id={`${form}Location`} className={`${form}Input`} type="text" name="location" value={newForm.location} onChange={handleChange}/>
        </div>
        <div className={`${form}Block`}>
          <label for="cost" className={`${form}Label`}>Cost</label><br/>
          <input id={`${form}Cost`} className={`${form}Input`} type="text" name="cost" value={newForm.cost} onChange={handleChange}/>
        </div>
        <div className={`${form}Block`}>
          <label for="description" className={`${form}Label`}>Description</label><br/>
          <textarea id={`${form}Description`} className={`${form}Input`} type="test" name="description" cols="25" rows="5" value={newForm.description} onChange={handleChange}/>
        </div>
        <div className={`${form}Block`}>
          <label for="early" className={`${form}Label`}>No Earlier Than:</label><br/>
          <TimeDropdown id={`${form}Early`} className={`${form}Input`} name="early" value={newForm.early} onChange={handleChange}/>
        </div>
        <div className={`${form}Block`}>
          <label for="late" className={`${form}Label`}>No Later Than:</label><br/>
          <TimeDropdown id={`${form}Late`} className={`${form}Input`} name="late" value={newForm.late} onChange={handleChange}/>
        </div>
        <div className={`${form}Block`}>
          <label for="days" className={`${form}Label`}>Days</label><br/>
          <input id={`${form}Days`} className={`${form}Input`} type="number" name="days" value={newForm.days} onChange={handleChange} />
        </div>
      </form>
    )
  }

  const inputForm = () => {
    if (newForm.days > 0) {
      return (
        <Grid early={newForm.early} late={newForm.late} days={newForm.days}/>
      )   
    } else {
      return (
        <h4>Enter a number of days greater than 0 for your event!</h4>
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