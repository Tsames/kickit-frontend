//Dependencies
import { React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight  } from "react-icons/md";

//Import Components
import Grid from '../input_components/Grid';
import Field from '../input_components/Field';

//Styling
import '../../styles/page_styling/attend.scss';

const Attend = ({ getEventData, event, blocks, URL }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //Get Id from params
  const id = useParams().id;

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

  //Stores data about the block that should be displayed - defaults to the first block
  const [blockIndex, setBlockIndex] = useState(0);

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //The message displayed when there is match in isAvailable()
  const doubleSignUpMessage = "*Someone has already signed up for this event under this name. If you submit under this name you will replace their record!"

  //Helper function(attend-taken JSX) checks if the name input into the field already matches an attendee's
  const isAvailable = () => {

    const searchName = form.name.toLowerCase();
    const searchArray = event.attending;

    for (let i=0; i < searchArray.length; i++) {
      if (searchArray[i].name.toLowerCase() === searchName) {
        return true
      }
    }

    return false;
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

    // console.log("Updated availability to:")
    // console.log(newAvailable);
    setForm({ ...form, "available": newAvailable });
  }

  //Handler function - the function that is run upon submission of the html form
  const handleSubmit = async (event) => {
    await submitData();
    getEventData(id);
    navigate(`/attend/submitted/${id}`);
  }

  //Handler Function - Adds One to BlockIndex if appropriate
  const nextBlock = () => {
    if (blockIndex < blocks.length - 1) {
      setBlockIndex(blockIndex + 1);
    }
  }

  //Handler Function - Subtracts One to BlockIndex if appropriate
  const prevBlock = () => {
    if (blockIndex > 0) {
      setBlockIndex(blockIndex - 1);
    }
  }

  const goToIndex = (e) => {
    setBlockIndex(Number(e.target.dataset.index));
  }

  /* ------------------------------------------ JSX Helpers ------------------------------------------ */

  /* Helper function (attend) - creates a visual for which block the user is viewing */
  const prepareBlockIndex = () => {
    const content = [];

    if (blocks.length > 1) {
      blocks.forEach((element, index) => {
        content.push(<div
          key={index}
          id={`block-index-${index}`}
          className={ index === blockIndex ? "block-index-indicator index-active" : "block-index-indicator"}
          data-index={index}
          onClick={goToIndex}
        />)
      });
    }

    return content
  }

  //Helper function (attend) - creates an array of grid components, one for each block
  const prepareBlocks = () => {
    //Create an array of grid components for the number of blocks for this event
    const content = [];

    if (blocks.length !== 0) {
      blocks.forEach((singleBlock, index) => {
        content.push(<Grid
          key={singleBlock[0]}
          className={"attend-grid-input"}
          early={event.early}
          late={event.late}
          days={singleBlock}
          block={index + 1}
          handleAvailable={handleAvailable}
          active={form.available[index]} />
        )
      });
    }

    return content
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="attend-wrapper">
      <div id="attend-left">
        <h2>Sign Up</h2>
        <p id="attend-taken">{ isAvailable() ? doubleSignUpMessage : ""}</p>
        <div id="attend-left-data">
          <Field form={"attend"} type={"text"} name={"name"} text={"Your Name"} value={form.name} doThis={handleName}/>
          <button id="attend-submit" onClick={handleSubmit} data-to="details">Submit</button>
        </div>
      </div>
      <div id="attend-right">
        <div id="attend-block-index">
          <button id="prev-block" className="index-button" onClick={prevBlock}><MdKeyboardArrowLeft/></button>
          {prepareBlockIndex()}
          <button id="next-block" className="index-button" onClick={nextBlock}><MdKeyboardArrowRight/></button>
        </div>
        <div id="attend-current-block">
        {prepareBlocks()[blockIndex]}
        </div>
      </div>
    </div>
  )
}

export default Attend;