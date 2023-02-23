//Dependencies
import React, { useEffect, useRef, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

//Styling
import '../../styles/navigation_styling/navbar.scss';

//Props Interface
interface navbarProps {
  eventId: string;
}

const Navbar: FC<navbarProps> = ({ eventId }) => {

  /* ------------------------------------------ Component Variables ------------------------------------------ */

  // const pages = ['/', '/create', '/example', '/about/how', '/about/who']
  // const buttons = ['navbarHomeButton', 'navbarCreateButton', 'navbarExampleButton', 'navbarAboutButton', 'navbarAboutButton'];

  const location = useLocation().pathname;
  // const lastLocation = useRef(null);

  // useEffect(() => helperOnPage());

  // const helperOnPage = () => {
  //   let buttonChecker;
  //   pages.forEach((element, index) => {
  //     if (location === element) {
  //       document.getElementById(buttons[index]).classList.add('navOnPage');
  //       buttonChecker = buttons[index];
  //     } else if (element === lastLocation.current && buttonChecker !== buttons[index]) {
  //       document.getElementById(buttons[index]).classList.remove('navOnPage');
  //     }
  //   });

  //   lastLocation.current = location;
  // }

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (navbar-shell) Variant
  const containerVariant = {
    initial: { 
      width: 0,
      height: "100%"
    },
    animate: {
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
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  /* --------------- Gestures --------------- */

  //Hover
  const navItemHover = {
    scale: 1.3,
    transition: {
      duration: 0.2,

    }
  }

  const createButtonHover = {
    scale: 1.3,
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
      <motion.div id="navbar-motion-wrapper" variants={containerVariant} initial="initial" animate="animate">
        <div id="navLeft">
          <Link to="/"><motion.h1 id="navbarHomeButton" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>Kick It</motion.h1></Link>
        </div>
        <div id="navRight">
          <div id="navItems-wrapper">
            <Link to="/example"><motion.button id="navbarDemo" className="navItem" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>How It Works</motion.button></Link>
            <Link to="/about"><motion.button id="navbarAboutUs" className="navItem" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>About Us</motion.button></Link>
          </div>
          <div id="navCreate-wrapper">
            <Link to="/create"><motion.button id="navbarCreate" variants={childVariant} whileHover={createButtonHover} whileTap={createButtonTap}>Create Event</motion.button></Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;