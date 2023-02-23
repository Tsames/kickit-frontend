//Dependencies
import React, { FC } from "react";
import { motion } from 'framer-motion';

//Styling
import './../../styles/loading_styling/modalLoading.scss'

//Props Interface
interface modalProps  {
  show: boolean;
}

const ModalLoading: FC<modalProps> = ({ show }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (#navbar-shell) Variant
  const modalVariant = {
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
    <motion.div id="modal-loading-shell" className={show ? "" : "collapse"} variants={modalVariant} initial={false} animate="animate" exit="exit">
      <motion.h1 className={show ? "" : "invisible"}>Loading content...</motion.h1>
    </motion.div>
  )
}

export default ModalLoading;