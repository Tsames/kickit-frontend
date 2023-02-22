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


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="modal-loading-shell" className={show ? "" : "no-select invisible hideBehind"}>
      <motion.h1>Loading content...</motion.h1>
    </motion.div>
  )
}

export default ModalLoading;