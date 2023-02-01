//Dependencies
import { React } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

//Styling
import '../../styles/navigation_styling/footer.scss';

//Icons
import { FiFacebook, FiInstagram, FiYoutube, FiLinkedin } from "react-icons/fi";

const Footer = () => {

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
      <Link to="/"><motion.h1 id="footerHomeButton" variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}>Kick It</motion.h1></Link>
      <div id="footer-middle">
        <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="footerAbout"  className="footer-middle-link" to="/about/who">About</Link></motion.p>
        <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="footerCreate" className="footer-middle-link" to="/create">Create</Link></motion.p>
        <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="footerDemo" className="footer-middle-link" to="/example">Demo</Link></motion.p>
        <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="footerAboutUs" className="footer-middle-link" to="/about/who">About Us</Link></motion.p>
      </div>
      <div id="footer-right">
      <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="" className="footer-right-link" to="/about/who"><FiFacebook></FiFacebook></Link></motion.p>
      <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="" className="footer-right-link" to="/about/who"><FiInstagram></FiInstagram></Link></motion.p>
      <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="" className="footer-right-link" to="/about/who"><FiYoutube></FiYoutube></Link></motion.p>
      <motion.p variants={childVariant} whileHover={footerItemHover} whileTap={footerItemTap}><Link id="" className="footer-right-link" to="/about/who"><FiLinkedin></FiLinkedin></Link></motion.p>
      </div>
    </div>
  )
}

export default Footer;