//Dependencies
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Import Components
import Grid from "../input_components/Grid";
import Field from "../input_components/Field";

//Styling
import '../../styles/page_styling/view_event.scss';

const AttendForm = ({ URL, event, blocks, togglePage }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/
  let navigate = useNavigate();

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

  const checkPerson = () => {
  }

  //Helper function - Updates the attending key:value of form
  const handleAvailable = (selectedCells) => {
    const newAvailable = [...form.available];
    selectedCells.forEach((element) => {
      const index = checkAvailable(element);
      if (index === null) {
        newAvailable.push(element);
      }
    })

    console.log("Updated availability to:")
    console.log(newAvailable);
    setForm({ ...form, "available": newAvailable });
  }

  const checkAvailable = (item) => {
    let exists = null;

    form.available.forEach((cell, index) => {
      if (cell[0] === item[0] && cell[1] === item[1] && cell[2] === item[2]) {
        exists = index;
      }
    })

    return exists;
  }

  //Helper function - replaces attending data if the person's record already exists, otherwise adds to it
  const prepareData = () => {
    const data = [ ...event.attending ]; let swap = false;

    //If no one has yet submitted their availability data yet then just push new data to array
    if (data.length === 0) {
      data.push(form);

    //Else check and see if the person's availability already exists
    } else {
      let i = 0;
      while (!swap && i < data.length) {
        if (data[i].name === form.name) {
          swap = true;
          data.splice(i, 1, form);
        }
        i++;
      }

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
    const newEventData = { ...event, attending: newAttending };
    
    await fetch(URL, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEventData),
    });
  };

  //Helper function - the function that is run upon submission of the html form
  const handleSubmit = async (event) => {
    await submitData();
    togglePage(event);
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
        <div id="rsvp-left">
          <h2>Sign Up</h2>
          <p id="rsvp-taken">{checkPerson()}</p>
          <div id="rsvp-left-data">
            <Field form={"attend"} type={"text"} name={"name"} text={"Your Name"} value={form.name} doThis={handleName} />
            <button id="rsvp-submit" onClick={handleSubmit} data-to="details">Submit</button>
          </div>
          <button id="rsvp-back" onClick={togglePage} data-to="details">Back</button>
        </div>
        <div id="rsvp-right">
          {grids}              
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