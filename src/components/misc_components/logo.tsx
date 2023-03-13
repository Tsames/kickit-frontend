//Dependencies
import React, { FC } from "react";
import { motion } from 'framer-motion';

//Styling
import './../../styles/misc_styling/logo.scss'

//Props Interface
interface LogoProps  {
}

const Logo: FC<LogoProps> = ({ }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="logo-background"><motion.div id="logo-k"></motion.div></motion.div>
  )
}

export default Logo;