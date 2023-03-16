//Dependencies
import React, { FC, MouseEvent, BaseSyntheticEvent, useState } from "react";
import { motion } from 'framer-motion';

//Import Components
import SelectTime from './selectTime'

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/createBottomSection.scss';

//Attending Interface
interface attendingInterface {
  name: string;
  available: Array<[number, number, number]>;
}

//Props Interface
interface CBSProps {
  newForm: {
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
    attending: Array<attendingInterface>;
  };
  handleChangeTime: (newEarly: number, newLate: number) => void;
  handleSubmit: () => Promise<void>;
}

const CreateBottomSection: FC<CBSProps> = ({ newForm, handleChangeTime, handleSubmit }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //State that stores toggle data for custom time
  const [toggle, setToggle] = useState<boolean>(false);


  interface customTimeInterface {
    early: number;
    late: number;
  }

  //State that tracks custom time selections
  const [customTime, setCustomTime] = useState<customTimeInterface>({
    early: 0,
    late: 0
  })

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  const parentVariant = {
    inactive: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.3 }
    },
    active: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  const childVariantDesktop = {
    inactive: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 50 }
    },
    active: {
      y: "-7vw",
      transition: { type: "spring", stiffness: 400, damping: 50, delay: 0.3 }
    }
  }

  const childVariantMobile = {
    inactive: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 50 }
    },
    active: {
      y: -50,
      transition: { type: "spring", stiffness: 400, damping: 50, delay: 0.3 }
    }
  }

  const timeSelectTextVariant = {
    inactive: {
      height: "100%",
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 50 }
    },
    active: {
      height: 0,
      opacity: 0,
      margin: 0,
      transition: { type: "spring", stiffness: 400, damping: 50, delay: 0.3 }
    }
  }

  //Hover
  const timeButtomHover = {
    scale: 1.05,
    backgroundColor: "#BEC9FF",
    transition: {
      duration: 0.2,
    }
  }

  const submitButtonHover = {
    scale: 1.3,
    borderWidth: "0.3vw",
    borderColor: "#818DFF",
    transition: {
      duration: 0.2,
    }
  }

  const cannotSubmitHover = {
    scale: 1.3,
    borderWidth: "0.3vw",
    borderColor: "#721717",
    color: "#721717",
    backgroundColor: "#e95151"
  }

  //Tap
  const timeButtonTap = {
    scale: 0.9,
    color: "#014D59",
    borderWidth: "0.2vw",
    backgroundColor: "#D7FFB7",
    transition: {
      duration: 0.3
    }
  }

  const submitButtonTap = {
    scale: 0.9,
    color: "#014d59",
    borderColor: "#014d59",
    backgroundColor: "#9AFF9E",
  }

  const cannotSubmitTap = {
    x: [0, -15, 0, 15, 0, -15, 0, 15, 0, -15, 0, 15, 0, -15, 0, 15, 0],
    scale: 1.3,
    borderWidth: "0.3vw",
    borderColor: "#721717",
    color: "#721717",
    backgroundColor: "#e95151",
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //Helper function - determines the helper submit text that needs to be displayed in the chat bubble.
  const determineChatBubble = (): string => {
    const checkArray = [];
    let outputString = "You still need to";

    if(newForm.title === "") checkArray.push(0);
    if(newForm.location === "") checkArray.push(1);
    if(newForm.days.length === 0) checkArray.push(2);
    if((newForm.early === 0 || newForm.late === 0) || !checkValidTimeSelect()) checkArray.push(3);

    if(checkArray.length === 0) {
      return "You're ready to create your event. Make sure all the details are correct before submitting. Once you submit you cannot edit your event."
    }

    //Title
    if (newForm.title === "" && checkArray.length > 2) {
      outputString += " enter a title,"
    } else if (newForm.title === ""){
      outputString += " enter a title"
    }

    //Location
    if (newForm.location == "" && checkArray.length > 2) {
      outputString += " enter a location,";
    } else if (newForm.location === "" && (checkArray.length == 2 && checkArray.includes(0))) {
      outputString += " and enter a location"
    } else if (newForm.location === "") {
      outputString += " enter a location"
    }

    //Days
    if (newForm.days.length == 0 && ((checkArray.length === 3 && checkArray.includes(3)) || checkArray.length === 4)) {
      outputString += " enter at least one day,";
    } else if (newForm.days.length === 0 && ((checkArray.length === 3 || checkArray.length === 2) && !checkArray.includes(3))) {
      outputString += " and enter at least one day"
    } else if (newForm.days.length === 0) {
      outputString += " enter at least one day"
    }

    //Time
     if (((newForm.early === 0 || newForm.late === 0) || !checkValidTimeSelect()) && checkArray.length >= 2) {
      outputString += " and enter a valid time range"
    } else if (((newForm.early === 0 || newForm.late === 0) || !checkValidTimeSelect()) && !checkValidTimeSelect()) {
      outputString += " enter a valid time range"
    }

    outputString += " for your event before submitting."

    return outputString
  }

  /* Helper function - determines whether a time selection is valid
  Days are considered to start at 5am (5) and end at 4am (4). This means that 4 is later than 24 (12 am) */
  const checkValidTimeSelect = (): boolean => {

    //If both early and late are less than 5 AND late is less than or equal to early, then the selection is invalid. 
    if ((newForm.early < 5 && newForm.late < 5) && newForm.late <= newForm.early) {
      return false;

    //If both early and late are greater than or equal to 5 and late is less than or equal to early, then the selection is invalid.
    } else if ((newForm.early >= 5 && newForm.late >= 5) && newForm.late <= newForm.early) {
      return false;

    //If early is less than or equal to 5 and late is greater than 5, then the selection is invalid.
    } else if (newForm.early < 5 && newForm.late >= 5) {
      return false;

    //Otherwise, the selection is valid.
    } else {

      return true;
    }
  }

  //Helper function - Manages the classes of the time selection presets and custom buttons.
  const manageClasses = (event: BaseSyntheticEvent, toggleWhat  = false) => {
    const wrapper = event.target.parentElement.childNodes;

    //Iterate through children of parent and remove class
    wrapper.forEach((child: any) => {
      child.classList.remove("button-selected");
    });

    //Add class to selected button
    event.target.classList.add("button-selected");

    //Set toggle to false if true
    if (toggleWhat) {
      setToggle(true);
    } else {
      setToggle(false)
    }
  }

  //Helper function - Checks if all required fields are adequately filled out
  const checkSubmit = (): boolean => {
    //If all required fields are completed - then create the event.
    if (newForm.title !== "" && newForm.location !== "" && newForm.days.length !== 0 && newForm.late !== 0 && newForm.late !== 0 && checkValidTimeSelect()) {
      return true;
    //Otherwise draw attention to chat bubble and play button animation.
    } else {
      return false;
    }
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Helper function - Manages the classes of the time selection major values.
  const handlePreset = (event: BaseSyntheticEvent) :void => {

    manageClasses(event);

    //Send data to state in create.js
    const earlyValue = Number(event.target.dataset.early);
    const lateValue = Number(event.target.dataset.late);

    // console.log(`changing early to ${earlyValue}`);
    // console.log(`changing late to ${lateValue}`);

    handleChangeTime(earlyValue, lateValue);
  }

  //Toggle Custom time menu
  const handleCustomTime = (event : MouseEvent<HTMLButtonElement>) :void => {

    manageClasses(event, true);

    const earlyValue = customTime.early;
    const lateValue = customTime.late;

    // console.log(`changing early to ${earlyValue}`);
    // console.log(`changing late to ${lateValue}`);

    handleChangeTime(earlyValue, lateValue);
  }

  const handleCheckSubmit = () :void => {
    //If all required fields are completed - then create the event.
    if (checkSubmit()) {
      handleSubmit();
    }
  }

  /* @#@#@#@#@#@#@#@#@#@#@#@#@#@ Passing Handler Functions @#@#@#@#@#@#@#@#@#@#@#@#@#@ */

  //Set new custom early - that is passed to selectTime component
  const handleCustomEarly = (value: number) :void => {

    //Grab the current late value
    const currentLateValue = customTime.late;
    const newEarlyValue = value;

    handleChangeTime(newEarlyValue, currentLateValue);
    setCustomTime({...customTime, "early": value});
  }

  //Set new custom late - that is passed to selectTime component
  const handleCustomLate = (value: number) :void => {

    //Grab the current early value
    const currentEarlyValue = customTime.early;
    const newLateValue = value;

    handleChangeTime(currentEarlyValue, newLateValue);
    setCustomTime({...customTime, "late": value});
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="create-bottom-section">
      <div id="create-bottom-left-subsection">
        <motion.div id="create-time-select-warning" className={ (newForm.early === 0 && newForm.late === 0) || checkValidTimeSelect() ? "invisible no-select hidden" : "no-select"}>
          <p id="create-time-select-warning-maintext">Your custom range selection is invalid. Please make sure the start time is earlier than the end time.</p>
          <p id="create-time-select-warning-subtext">* Days are considered to start at 5 am and end at 4 am to account for late night events.</p>
        </motion.div>
        <motion.h3 id="create-time-select-header" variants={timeSelectTextVariant} initial={false} animate={toggle ? "active" : "inactive"}>Time Range</motion.h3>
        <motion.p id="create-time-select-secondary-text" variants={timeSelectTextVariant} initial={false} animate={toggle ? "active" : "inactive"}>Pick a preset, or make your own custom range.</motion.p>
        <motion.div id="create-time-select-wrapper" variants={window.innerWidth >= 900 ? childVariantDesktop : childVariantMobile} initial={false} animate={toggle ? "active" : "inactive"}>
          <motion.button data-early="11" data-late="16" className="create-time-select-button" whileHover={timeButtomHover}  whileTap={timeButtonTap} onClick={handlePreset}>11am - 4pm</motion.button>
          <motion.button data-early="16" data-late="21" className="create-time-select-button" whileHover={timeButtomHover} whileTap={timeButtonTap} onClick={handlePreset}>4pm - 9pm</motion.button>
          <motion.button data-early="21" data-late="2" className="create-time-select-button" whileHover={timeButtomHover}  whileTap={timeButtonTap} onClick={handlePreset}>9pm - 2am</motion.button>
          <motion.button className="create-time-select-button" whileHover={timeButtomHover} whileTap={timeButtonTap} onClick={handleCustomTime}>Custom</motion.button>
          <SelectTime elementId="select-time-early" handleChange={handleCustomEarly} toggle={toggle} text="Start"></SelectTime>
          <SelectTime elementId="select-time-late" handleChange={handleCustomLate} toggle={toggle} text="End"></SelectTime>
        </motion.div>
      </div>
      <div id="create-bottom-right-subsection">
        <div id="create-submit-text-bubble">
          <p id="create-submit-text" className="no-select">{determineChatBubble()}</p>
        </div>
        <div id="create-submit-text-bubble-tail"></div>
        <div id="create-person-graphic"></div>
        <motion.button id="create-submit" whileHover={checkSubmit() ? submitButtonHover : cannotSubmitHover} whileTap={checkSubmit() ? submitButtonTap : cannotSubmitTap} onClick={handleCheckSubmit}>Done</motion.button>
      </div>
    </div>
  )
}

export default CreateBottomSection;