//Dependencies
import React, { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

//Import Components


//Styling
import '../../../styles/create_pages_styling/create_page/create.scss';

//Attending Interface
interface attendingInterface {
  name: string;
  available: Array<[number, number]>;
}

interface eventDataInterface {
  _id: string;
  title: string;
  location: string;
  description: string;
  early: number;
  late: number;
  days: number[];
  attending: Array<attendingInterface>;
}

interface invitationProps {
  eventData: eventDataInterface;
  setEvent: (event: eventDataInterface) => void;
  checkEvent: (id: string) => Promise<boolean>;
}

const Invitation: FC<invitationProps> = ({ eventData, setEvent, checkEvent }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  let params = useParams();
  
  const [verifiedEvent, setVerifiedEvent] = useState(false);

  useEffect(() => {

    const checkData = async () => {
      let id = params.id as string;

      try {
        setVerifiedEvent(await checkEvent(id));
      } catch {
        setVerifiedEvent(false);
      }
    }

    checkData();
    
  }, []);

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
      {!verifiedEvent && 
        <h1>
          There is no event that matches this URL.
        </h1>
      }
    </motion.div>
  )
}

export default Invitation;