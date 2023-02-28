//Dependencies
import React, { FC, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

//Import Components


//Styling
import '../../../styles/create_pages_styling/create_page/create.scss';

interface eventDataInterface {
  _id: string;
  title: string;
  location: string;
  description: string;
  early: number;
  late: number;
  days: number[];
  attending: Array<number>[];
}

interface invitationProps {
  eventData: eventDataInterface;
  setEvent: (event: eventDataInterface) => void;
  getEventData: (id: string) => Promise<boolean>;
}

const Invitation: FC<invitationProps> = ({ eventData, setEvent, getEventData }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  let navigate = useNavigate();

  const DEV_BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND + "events/";
  // const BACKEND_URL = process.env.REACT_APP_KICKIT_BACKEND + "events/";

//   //Interface for newForm State
//   interface eventDataInterface {
//     title: string;
//     location: string;
//     description: string;
//     early: number;
//     late: number;
//     days: number[];
//     attending: Array<number>[];
//   }

//   //State that stores input
//   const [newForm, setNewForm] = useState<newFormInterface>({
//     title: "",
//     location: "",
//     description: "",
//     early: 0,
//     late: 0,
//     days: [],
//     attending: []
//   });

//   useEffect(() => {
//     console.log("newForm has been updated to:");
//     console.log(newForm);
//   }, [newForm])

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  const eventPageVariant = {
    hidden: {
      y: "-100vw"
    },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15}
    },
    exit: {
    }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="invitation-shell">

    </motion.div>
  )
}

export default Invitation;