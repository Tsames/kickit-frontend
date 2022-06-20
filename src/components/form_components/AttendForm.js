//Dependencies
import { React, useState, useEffect } from 'react';

//Import Components
import Grid from "../input_components/Grid";
import Field from "../input_components/Field";

//Styling
import '../../styles/page_styling/view_event.scss';

const AttendForm = ({match, setRoot}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const id = match.params.id;
  const URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "events/" + id;
  setRoot("rb-attend-event");

  //State to store event data
  const [event, setEvent] = useState(null);

  //State to store attendance data that will be submitted to the event record on the backend
  const [form, setForm] = useState({
    name: "",
    available: []
  });

  let blocks = [];

  /* ------------------------------------------ Helper Functions ------------------------------------------*/

  //Helper function - arranges the days array into sub arrays of only adjacent days
  const makeBlocks = (daysArray) => {
    const newBlocks = [], data = [ ...daysArray ];
    while (data.length > 0) {
      const smallBlock = [];
      smallBlock.push(data.shift());
      while (Number(data[0]) - Number(smallBlock[smallBlock.length - 1]) <= 86400000) {
        smallBlock.push(data.shift());
      }
      newBlocks.push(smallBlock);
    }

    blocks = newBlocks;
  }

  //Helper function - Updates the name key:value of form
  const handleName = (event) => {
    setForm({ ...form, "name": event.target.value });
  }

  //Helper function - Updates the attending key:value of form
  const handleAvailable = (selectedCells) => {
    setForm({ ...form, "available": selectedCells });
  }

  //Helper function that replaces attending data if the person's record already
  // exists, otherwise adds to it
  const prepareData = () => {
    const attendingData = event.attending; let swap = false;

    if (attendingData.length !== 0) {
      attendingData.forEach((person, index) => {
        if (swap === false && person.name === form.name) {
          swap = true;
          attendingData.splice(index, 1, form);
        }
      })
      if (!swap) {
        attendingData.push(form);
        attendingData.sort()
      }
    } else {
      attendingData.push(form);
    }
    return attendingData;
  }

  //Helper function - sends put request to the appropriate backend URL
  const submitData = async (events) => {
    const newAttending = prepareData();
    const newEventData = { ...event, "attending": newAttending };

    console.log(`This is the new Event data right before submitting put request:`);
    console.log(newEventData);

    console.log(`Submitting data for ${form.name}:`);
    console.log(form.attending);
    
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
  
  /* ------------------------------------------ Fetch Data ------------------------------------------*/

  //Helper function - gets relevant event data
  const getEventData = async () => {
    try {
      //Fetch event data
      const response = await fetch(URL);
      const data = await response.json()

      //Use helper function to construct an array of arrays, where each child array contains
      //only consecutive days - this is for the grid component
      makeBlocks(data.days)
      console.log(blocks);

      //Set event state
      setEvent(data);

    } catch (error) {
      console.log(error);
    }
  }

  //Run to get relevant event data upon first loading
  useEffect(() => getEventData(), []);

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  const loading = () => {
    return(
      <h4>Loading...</h4>
    )
  }

  const loaded = () => {

    //Create an array of grid components for the number of blocks for this event
    const grids = [];

    console.log(blocks);

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
        <p>{`${event.title}`} will be held between {event.early} and {event.late}</p>
        <div id="attend-input-container">
          <form id="AttendForm" onSubmit={handleSubmit}>
            <Field form={"attend"} type={"text"} name={"name"} text={"Your Name"} value={form.name} doThis={handleName}/>
            {grids}
            <Field form="attendForm" type="submit" name="submit" text="" value="Submit"/>
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