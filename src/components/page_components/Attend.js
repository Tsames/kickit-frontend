//Dependencies
import { React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//Import Components
import Grid from '../input_components/Grid';
import Field from '../input_components/Field';
import GridsToShare from '../transition_components/GridsToShare';

//Styling
import '../../styles/page_styling/attend.scss';

const Attend = ({ getEventData, event, blocks, URL }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //Get Id from params
  const id = useParams().id;

  /* If the event stored in state does not have the same id as the id in params then call
  getEventData from App.js and get the data of the event that matches the id in params */
  if (event === null || id !== event._id) {
    getEventData(id);
  }

  /* Helper function (form.available state) - builds an array of arrays of length n where
  n is the number of blocks */
  const setUpAvailable = () => {
    const newAvailable = [];
    for (let i = 0; i < blocks.length; i++) {
      newAvailable.push([]);
    }
    return newAvailable;
  }

  //State to store attendance data that will be submitted to the event record on the backend
  const [form, setForm] = useState({
    name: "",
    available: setUpAvailable()
  });

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //Helper function(attend-taken p tag)
  const isAvailable = () => {
    const searchName = form.name;
    const searchArray = event.attending;
    let match = false;
    let i = 0;

    while (!match || i < searchArray.length) {
      if(searchArray[i].name === searchName) {
        match = true
      }
      i++
    }

    return match;
  }


  //Helper function (prepare Data) - combines all of the seperate block's arrays into a single array
  const squishAvailable = () => {
    const newAvailable = [];
    for (let i = 0; i < form.available.length; i++) {
      newAvailable.push(...form.available[i]);
    }
    newAvailable.sort();
    return newAvailable
  }

  //Helper function (submitData) - replaces attending data if record already exists, otherwise adds to it
  const prepareData = () => {
    const submitted = { ...form, available: squishAvailable() }
    const data = [...event.attending]; let swap = false;

    //If no one has yet submitted their availability data yet then just push new data to array
    if (data.length === 0) {
      data.push(submitted);

      //Else check and see if the person's availability already exists
    } else {
      let i = 0;
      while (!swap && i < data.length) {
        if (data[i].name === submitted.name) {
          swap = true;
          data.splice(i, 1, submitted);
        }
        i++;
      }

      //If we don't find an existing record then push and sort
      if (!swap) {
        data.push(submitted);
        data.sort()
      }
    }

    return data;
  }

  //Helper function (handleSubmit)- sends put request to the appropriate backend URL
  const submitData = async (events) => {
    const newAttending = prepareData();
    const newEventData = { ...event, attending: newAttending };
    console.log("Sending put request to server:");
    console.log(newEventData);

    await fetch(URL + event._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEventData),
    });
  };

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Handler function - Updates the name key:value of form
  const handleName = (event) => {
    setForm({ ...form, "name": event.target.value });
  }

  //Handler function - Updates the attending key:value of form
  const handleAvailable = (selectedCells, block) => {
    const newAvailable = [...form.available];
    newAvailable.splice(block - 1, 1, selectedCells);

    console.log("Updated availability to:")
    console.log(newAvailable);
    setForm({ ...form, "available": newAvailable });
  }

  //Handler function - the function that is run upon submission of the html form
  const handleSubmit = async (event) => {
    await submitData();
    getEventData(id);
    navigate(`/attend/submitted/${id}`);
  }

  //asdf
  //Handler function - returns the page to Share.js with animation
  const handleReturn = (event) => {
    const transitionBack = document.getElementById("grids-to-share-transition");

    transitionBack.className = "grids-to-share-transition-move";
    setTimeout(() => {
      navigate(`/share/${id}`);
    }, 1000)
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  //JSX to display if event is still in the process of loading
  const noEvent = () => {
    return (
      <h4 id="loading">Loading...</h4>
    )
  }

  //Main JSX
  const attend = () => {

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
          handleAvailable={handleAvailable} />
        )
      });
    }

    return (
      <div id="attend-main">
        <GridsToShare />
        <div id="attend-left">
          <h2>Sign Up</h2>
          <p id="attend-taken">{}</p>
          <div id="attend-left-data">
            <Field form={"attend"} type={"text"} name={"name"} text={"Your Name"} value={form.name} doThis={handleName} inputHeight='5rem' inputWidth='15rem'/>
            <button id="attend-submit" onClick={handleSubmit} data-to="details">Submit</button>
          </div>
          <button id="attend-back" data-to="details" onClick={handleReturn}>Back</button>
        </div>
        <div id="attend-right">
          {grids}
        </div>
      </div>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="attend-wrapper" className="page-body">
      {event === null ? noEvent() : attend()}
    </div>
  )
}

export default Attend;