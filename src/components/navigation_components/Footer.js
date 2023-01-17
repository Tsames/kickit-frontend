//Dependencies
import { React } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

//Styling
import '../../styles/navigation_styling/footer.scss';

const Footer = () => {

  /* ------------------------------------------ Component Variables ------------------------------------------ */

  const location = useLocation().pathname;
  const rightPlace = ['/', '/create']
  
  const shouldFoot = () => {
    return rightPlace.includes(location);
  }

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
    scale: 1.1,
    backgroundColor: "#4b3dc6",
    border: "solid",
    borderColor: "#818DFF"
  }


  //Tap
  const navItemTap = {
    scale: 0.9
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  const display = () => {
    return (
      <div id="footer-shell">
        <Link to="/"><motion.h1 id="footerHomeButton" variants={childVariant} whileHover={navItemHover} whileTap={navItemTap}>Kick It</motion.h1></Link>
        <div id="footer-middle">
          <p><Link id="footerAbout"  className="footer-middle-link" to="/about/who">About</Link></p>
          <p><Link id="footerCreate" className="footer-middle-link" to="/create">Create</Link></p>
          <p><Link id="footerDemo" className="footer-middle-link" to="/example">Demo</Link></p>
          <p><Link id="footerAboutUs" className="footer-middle-link" to="/about/who">About Us</Link></p>
        </div>
        <div id="footer-right">
          <p><Link id=""  className="footer-right-link" to="/about/who">A</Link></p>
          <p><Link id="" className="footer-right-link" to="/create">C</Link></p>
          <p><Link id="" className="footer-right-link" to="/example">D</Link></p>
          <p><Link id="" className="footer-right-link" to="/about/who">A</Link></p>
        </div>
      </div>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <>
      { shouldFoot() ? display() : null}
    </>
  )
}

export default Footer;