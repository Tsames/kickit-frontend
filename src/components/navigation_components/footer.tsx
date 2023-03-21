//Dependencies
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

//Styling
import '../../styles/navigation_styling/footer.scss';

//Props Interface
interface footerProps {
}

const Footer: FC<footerProps> = () => {

  /* ------------------------------------------ Component Variables ------------------------------------------ */


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
  const footerItemHover = {
    scale: 1.3,
    transition: {
      duration: 0.2,

    }
  }

  //Tap
  const footerItemTap = {
    scale: 0.9
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="footer-shell">
      <div id="link-wrapper">
        <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="footerAbout"  className="footer-link" to="/">Home</Link></motion.p>
        {/* <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="footerCreate" className="footer-link" to="/howItWorks">How It Works</Link></motion.p> */}
        <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="footerAboutUs" className="footer-link" to="/aboutUs">About Us</Link></motion.p>
        <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="footerDemo" className="footer-link" to="/create">Create</Link></motion.p>
        </div>
    </div>
  )
}

export default Footer;