//Dependencies
import React, { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

//Import Components
import Logo from './../../misc_components/logo'

//Styling
import '../../../styles/events_styling/invitation_styling/invitation.scss';

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
      <h1>You have been invited to...</h1>
      <div id="inv-graphic-wrapper">
        <div id="inv-graphic-one" className="inv-graphic"></div>
        <div id="inv-graphic-two" className="inv-graphic"></div>
        <div id="inv-graphic-three" className="inv-graphic"></div>
      </div>
      <div id="inv-details-wrapper">
        <h3>{eventData.title}</h3>
        <div id="inv-location-wrapper">
          <h3 id="inv-location-label" className="no-select">Location:</h3>
          <h3 id="inv-location">{eventData.location}</h3>
        </div>
        <div id="inv-description-wrapper">
          <p id="inv-description">{eventData.description !== "" ? eventData.description : "No event description was given."}</p>
        </div>
      </div>
      <button id="inv-next-button">Next</button>
    </motion.div>
  )
}

export default Invitation;