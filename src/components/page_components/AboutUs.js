//Dependencies
import { React } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

//Styling
import '../../styles/page_styling/about_us.scss';

const AboutUs = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //Framer-Motion Page Transition Settings
  const fade = {
    "initial": { opacity: 0 },
    "animate": { opacity: 1 },
    "exit": { opacity: 0 },
    "transition": { duration: 0.5 }
  }

  const shuffle = {
    "initial": { width: 0 },
    "animate": { width: "80%" },
    "exit": { x: window.innerWidth },
    "transition": { duration: 0.3 }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Conditional JSX ------------------------------------------ */



  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="about-shell">
      <div id="about-text-wrapper">
        <h1 id="about-text-title">About Us</h1>
        <h3 id="about-text-description">Get to know the people behind the product</h3>
      </div>
      <div id="about-people-wrapper">
        <div id="about-tom" className="about-person">
          <div id="tom-image"  className="about-person-image"></div>
          <div id="tom-contents" className="about-person-contents">
            <p id="tom-description" className="about-person-description">My name is Tom Ames and i do the hard stuff. the stuff with the numbers AND the letters.</p>
            <div id="tom-links" className="about-person-all-links">
              <p id="tom-github" classnName="about-person-link">github</p>
              <p id="tom-email" classnName="about-person-link">email</p>
              <p id="tom-linkedin" classnName="about-person-link">linkedin</p>
            </div>
          </div>
        </div>
        <div id="about-chris" className="about-person">
        <div id="chris-image" className="about-person-image"></div>
          <div id="chris-contents" className="about-person-contents">
            <p id="chris-description" className="about-person-description">Hello! I am Christopher Brand, a fellow UX Designer with Kick It. Check out my socials and portfolio!</p>
            <div id="chris-links" className="about-person-all-links">
              <p id="chris-portfolio" classnName="about-person-link">Portfolio</p>
              <p id="chris-email" classnName="about-person-link">email</p>
              <p id="chris-linkedin" classnName="about-person-link">linkedin</p>
            </div>
          </div>
        </div>
        <div id="about-amelia" className="about-person">
        <div id="amelia-image" className="about-person-image"></div>
          <div id="amelia-contents" className="about-person-contents">
            <p id="amelia-description" className="about-person-description">Hi! Im Amelia Schooley, a UX designer here at Kick It. Im passionate about using psychology and empathy to design useful products. Check out my portfolio and socials!</p>
            <div id="amelia-links" className="about-person-all-links">
              <p id="amelia-portfolio" classnName="about-person-link">Portfolio</p>
              <p id="amelia-email" classnName="about-person-link">email</p>
              <p id="amelia-linkedin" classnName="about-person-link">linkedin</p>
            </div>
          </div>
        </div>
      </div>
      <div id="about-wallpaper"></div>
    </motion.div>
  )
}

export default AboutUs;