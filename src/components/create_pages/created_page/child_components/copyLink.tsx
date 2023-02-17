//Dependencies
import React from "react";
import { FC, useRef, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { RxCopy } from "react-icons/rx";
import { motion } from 'framer-motion';

//Styling
import '../../../../styles/create_pages_styling/created_page/child_components/copyLink.scss';

//Props Interface
interface copyLinkProps  {
}

const CopyLink: FC<copyLinkProps> = ({ }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //Create Ref for HTML Element containing link
  const buttonRef = useRef<any>(0);

  //Get Id from params
  const eventId = useParams().id;

  //Get Base URL from .env
  const DEV_FRONTEND_URL = process.env.REACT_APP_KICKIT_DEV_FRONTEND + "events/" + `${eventId}`;
  // const FRONTEND_URL = process.env.REACT_APP_KICKIT_FRONTEND + "events/";

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Hover
  const buttonHover = {
    scale: 1.1,
    transition: {
      duration: 0.2,
    }
  }

  //Tap
  const buttonTap = {
    scale: 1,
    transition: {
      duration: 0.3
    }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  const copyText = () :void => {
    navigator.clipboard.writeText(DEV_FRONTEND_URL);
    buttonRef.current.classList.add('copied');
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="copyLink-shell">
        <motion.button ref={buttonRef} id="copyLink-button" whileHover={buttonHover} whileTap={buttonTap} onClick={copyText}><RxCopy></RxCopy></motion.button>
        <div id="copyLink-text-wrapper">
          <motion.p id="copyLink-text" className="no-select">{DEV_FRONTEND_URL}</motion.p>
        </div>
    </motion.div>
  )
}

export default CopyLink;