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
    attending: null
  });

  /* ------------------------------------------ Helper Functions ------------------------------------------*/

  //Helper function - arranges the days array into sub arrays of only adjacent days
  const makeBlocks = (daysArray) => {
    const newBlocks = [], data = daysArray;
    while (data.length > 0) {
      const smallBlock = [];
      smallBlock.push(data.shift());
      while (Number(data[0]) - Number(smallBlock[smallBlock.length - 1]) <= 86400000) {
        smallBlock.push(data.shift());
      }
      newBlocks.push(smallBlock);
    }
    return newBlocks
  }

  //Helper function - Updates the name key:value of form
  const handleName = (event) => {
    let newValue = event.target.value;
    setForm({ ...form, "name": newValue });
  }

  //Helper function - passed to the grid component which will update form upon the selections in the grid
  const handleAttending = (event) => {

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
      const blocks = makeBlocks(data.days);

      //Set event state
      setEvent({...data, "blocks": blocks});

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

    if (event.blocks != null && event.blocks.length !== 0) {
      event.blocks.forEach((singleBlock, index) => {
        grids.push(<Grid className={"attend-grid-input"} key={singleBlock[0]} early={event.early} late={event.late} days={singleBlock} block={index + 1}/>)
      });
    }

    return(
      <>
        <p>{`${event.title}`} will be held between {event.early} and {event.late}</p>
        <div id="attend-input-container">
          <Field form={"attend"} type={"text"} name={"name"} text={"Your Name"} value={form.name} doThis={handleName}/>
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