//Dependencies
import React, { FC } from "react";
import { motion } from 'framer-motion';

//Styling
import './../../styles/error_styling/noSuchEvent.scss'

//Props Interface
interface noSuchEventProps  {
  show: boolean;
}

const noSuchEvent: FC<noSuchEventProps> = ({ show }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (#navbar-shell) Variant
  const noSuchEventVariant = {
    animate: {
      width: "100vw",
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 30,
        when: "beforeChildren" 
      }
    },
    exit: {
      width: "0vw",
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 30,
        when: "beforeChildren" 
      }
    }
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="noSuchEvent-shell" className={show ? "" : "collapse"} variants={noSuchEventVariant} initial={false} animate="animate" exit="exit">
      <motion.h1 className={show ? "" : "invisible"}>Something went wrong. There is no event that matches your request.</motion.h1>
    </motion.div>
  )
}

export default noSuchEvent;