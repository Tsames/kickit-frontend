//Dependencies
import React, { useState, useEffect, useRef, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenuAlt3 } from "react-icons/hi";
import { AiFillPlusCircle } from "react-icons/ai";

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

  const [toggle, setToggle] = useState(false);

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (navbar-shell) Variant
  const containerVariant = {
    hidden: { 
      width: 0,
      height: "100%"
    },
    visible: {
      width: "100%",
      height: "100%",
      transition: {
        duration: 0.6,
        when: "beforeChildren" 
      }
    }
  }

  const extendedMenuVariant = {
    hidden: {
      height: 0,
      transition: {
        type: "spring"
      }
    },
    visible: {
      height: "15vw",
      transition: {
        type: "spring"
      }
    }
  }

  //Child Variants
  const childVariant = {
    hidden: { 
      opacity: 0 
    },
    visible: {
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

  //Conditional JSX for Desktops
  const desktop = () => {
    return (
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
    )
  }

  //Conditional JSX for Mobile and Portrait Tablets
  const mobile = () => {
    return (
      <>
        <motion.div id="navRight">
          <Link to="/create"><motion.button id="navMobileCreateButton" variants={childVariant} initial="hidden" animate={toggle ? "visible" : "hidden"}><AiFillPlusCircle id="navMobileCreateIcon"></AiFillPlusCircle></motion.button></Link>
        </motion.div>
        <motion.div id="navMiddle">
          <motion.button id="navMobileButton" variants={childVariant} initial="hidden" animate="visible" onClick={() => setToggle(!toggle)}><HiMenuAlt3 id="navMobileMenuIcon"></HiMenuAlt3></motion.button>
        </motion.div>
      </>
    )
  }

  const extended = () => {
    return (
      <motion.div id="navExtended" variants={extendedMenuVariant} initial={false} animate={ toggle ? "visible" : "invisible"}>
        <div id="navItems-wrapper">
          <Link to={`/event/${eventId}`} className={location.slice(0, 7) === "/event/" ? "onPage navBarLink no-select" : "navBarLink"}><motion.button id="navbarEvent" className="navItem" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>{eventId === "example" ? "Example Event" : "Your Event"}</motion.button></Link>
          <Link to="/howItWorks" className={location === "/howItWorks" ? "onPage navBarLink no-select" : "navBarLink"}><motion.button id="navbarHowItWorks" className="navItem" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>How It Works</motion.button></Link>
          <Link to="/aboutUs" className={location === "/aboutUs" ? "onPage navBarLink no-select" : "navBarLink"}><motion.button id="navbarAboutUs" className="navItem" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>About Us</motion.button></Link>
        </div>
        <div id="navCreate-wrapper">
          <Link to="/create" id="navbarCreateLink" className={location === "/create" ? "onPage no-select" : ""}><motion.button id="navbarCreate" variants={childVariant} whileHover={createButtonHover} whileTap={createButtonTap}>Create</motion.button></Link>
        </div>
    </motion.div>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <nav id="navbar-shell">
      <motion.div id="navbar-motion-wrapper" variants={containerVariant} initial="hidden" animate="visible">
        <div id="navLeft">
          <Link to="/" id="navbarHomeLink" className={location === "/" ? "onPage no-select" : ""}><button id="navbarHomeButton">Kick It</button></Link>
        </div>
        { window.innerWidth >= 900 ? desktop() : mobile()}
      </motion.div>
      { window.innerWidth >= 900 ? null : extended() }
    </nav>
  );
};

export default Navbar;