//Dependencies
import { React, useState } from 'react';

//Import Components
import Grid from "../input_components/Grid";
import Field from "../input_components/Field";

//Styling
import '../../styles/page_styling/view_event.scss';

const AttendForm = ({event, blocks}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  //State to store attendance data that will be submitted to the event record on the backend
  const [form, setForm] = useState({
    name: "",
    available: []
  });

  /* ------------------------------------------ Helper Functions ------------------------------------------*/

  //Helper function - Updates the name key:value of form
  const handleName = (event) => {
    setForm({ ...form, "name": event.target.value });
  }

  //Helper function - Updates the attending key:value of form
  const handleAvailable = (selectedCells) => {
    setForm({ ...form, "available": selectedCells });
  }

  //Helper function - replaces attending data if the person's record already exists, otherwise adds to it
  const prepareData = () => {
    const data = [ ...event.attending ]; let swap = false;

    //If no one has yet submitted their availability data yet then just push new datat to array
    if (data.length === 0) {
      data.push(form);
    //Else check and see if the person's availability already exists
    } else {
      data.forEach((person, index) => {
        if (swap === false && person.name === form.name) {
          swap = true;
          data.splice(index, 1, form);
        }
      })
      //If we don't find an existing record then push and sort
      if (!swap) {
        data.push(form);
        data.sort()
      }
    }

    return data;
  }

  //Helper function - sends put request to the appropriate backend URL
  const submitData = async (events) => {
    const newAttending = prepareData();
    const newEventData = { ...event, "attending": newAttending };

    console.log(`This is the new Event data right before submitting patch request:`);
    console.log(newEventData);
    
    await fetch(URL, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEventData),
    });
  };

  //Helper function - the function that is run upon submission of the html form
  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
    setForm({
      name: "",
      available: []
    });
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  const loading = () => {
    return(
      <h4>Loading...</h4>
    )
  }

  const loaded = () => {

    //Create an array of grid components for the number of blocks for this event
    const grids = [];

    if (blocks.length !== 0) {
      blocks.forEach((singleBlock, index) => {
        grids.push(<Grid 
          className={"attend-grid-input"} 
          key={singleBlock[0]} 
          early={event.early} 
          late={event.late} 
          days={singleBlock} 
          block={index + 1}
          handleAvailable={handleAvailable}/>
        )
      });
    }

    return(
      <>
        <div id="attend-input-container">
          <form id="AttendForm" onSubmit={handleSubmit}>
            <div id="field-container">
              <Field form={"attend"} type={"text"} name={"name"} text={"Your Name"} value={form.name} doThis={handleName} />
              <Field form="attendForm" type="submit" name="submit" text="" value="Submit" />
            </div>
            <div id="grids-container">
              {grids}              
            </div>
          </form>
        </div>
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div id="attend-form-shell" className="page-body">
      {event === null ? loading() :  loaded()}
    </div>
  )
}

export default AttendForm;