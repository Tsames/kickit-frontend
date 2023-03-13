//Dependencies
import React, { useState, useEffect, useRef, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

//Styling
import '../../styles/navigation_styling/navbar.scss';

//Import Components
import Logo from "./../misc_components/logo";

//Props Interface
interface navbarProps {
  eventId: string;
}

const Navbar: FC<navbarProps> = ({ eventId }) => {

  /* ------------------------------------------ Component Variables ------------------------------------------ */

  const location = useLocation().pathname;

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (navbar-shell) Variant
  const containerVariant = {
    initial: { 
      width: 0,
      height: "100%"
    },
    entranceAnimate: {
      width: "100%",
      height: "100%",
      transition: {
        duration: 0.6,
        delay: 1,
        when: "beforeChildren" 
      }
    }
  }

  //Child Variants
  const childVariant = {
    initial: { 
      opacity: 0 
    },
    entranceAnimate: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  /* --------------- Gestures --------------- */

  //Hover
  const navItemHover = {
    scale: 1.2,
    transition: {
      duration: 0.2,
    }
  }

  const createButtonHover = {
    scale: 1.1,
    border: "solid",
    borderColor: "#818DFF",
    transition: {
      duration: 0.2,
    }
  }


  //Tap
  const navItemTap = {
    scale: 0.9
  }

  const createButtonTap = {
    scale: 0.9,
    backgroundColor: "#2b37a5"
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <nav id="navbar-shell">
      <motion.div id="navbar-motion-wrapper" variants={containerVariant} initial="initial" animate="entranceAnimate">
        <div id="navLeft">
          <Link to="/" id="navbarHomeLink" className={location === "/" ? "onPage no-select" : ""}><Logo></Logo></Link>
        </div>
        <div id="navRight">
          <div id="navItems-wrapper">
            <Link to={`/event/${eventId}`} className={location.slice(0, 7) === "/event/" ? "onPage navBarLink no-select" : "navBarLink"}><motion.button id="navbarEvent" className="navItem" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>{eventId === "example" ? "Example Event" : "Your Event"}</motion.button></Link>
            <Link to="/howItWorks" className={location === "/howItWorks" ? "onPage navBarLink no-select" : "navBarLink"}><motion.button id="navbarHowItWorks" className="navItem" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>How It Works</motion.button></Link>
            <Link to="/aboutUs" className={location === "/aboutUs" ? "onPage navBarLink no-select" : "navBarLink"}><motion.button id="navbarAboutUs" className="navItem" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>About Us</motion.button></Link>
          </div>
          <div id="navCreate-wrapper">
            <Link to="/create" id="navbarCreateLink" className={location === "/create" ? "onPage no-select" : ""}><motion.button id="navbarCreate" variants={childVariant} whileHover={createButtonHover} whileTap={createButtonTap}>Create</motion.button></Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;