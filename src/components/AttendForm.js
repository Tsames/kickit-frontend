//Dependencies
import { React, useState, useEffect } from 'react';

//Import Components
import Grid from "./Grid";

//Styling
import '../styles/availabilitiesform.scss';

const AvailabilitiesForm = ({match}) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------*/

  const id = match.params.id;
  const apiURL = `http://localhost:3002/events/${id}`;

  const [event, setEvent] = useState({
    title: "",
    location: "",
    description: "",
    cost: "",
    early: "",
    late: "",
    days: "",
    blocks: ""
  });

  /* ------------------------------------------ Fetch Data ------------------------------------------*/

  //Helper function - gets relevant event data
  const getEventData = async () => {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw Error("Could not retrieve data.")
      }
      const data = await response.json()
      setEvent(data);
    } catch (error) {
      console.log(error);
    }
  }

  //Run to get relevant event data upon first loading
  useEffect(() => getEventData(), []);

  /* ------------------------------------------ Helper Functions ------------------------------------------*/
  const extractData = (data) => {
    data
  }

  const makeBlocks = () => {
    const output = [], data = dayArray;
    while (data.length > 0) {
      const smallBlock = [];
      smallBlock.push(data.shift());
      while (Number(data[0]) - Number(smallBlock[smallBlock.length - 1]) <= 86400000) {
        smallBlock.push(data.shift());
      }
      output.push(smallBlock);
    }
    return output;
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  const loading = () => {
    return(
      <h4>Loading...</h4>
    )
  }

  const loaded = () => {
    return(
      <>
        <h1>{event.title}</h1>
        <h6>{event.location}</h6>
        <p>{event.description}</p>
        <Grid early={event.early} late={event.late} blocks={} />
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <div id="availabilities-form-shell" className="page-body">
      {event === null ? loading() :  loaded()}
    </div>
  )
}

export default AvailabilitiesForm;