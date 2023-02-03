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
      <div id='about-bg'></div>
      <div id="about-text-wrapper">
        <h1 id="about-text-title">About Us</h1>
        <h3 id="about-text-description">Get to know the people behind the product</h3>
      </div>
      <div id="about-people-wrapper">
        <div id="about-tom" className="about-person">
          <div id="tom-image"  className="about-person-image"></div>
          <div id="tom-speech-bubble" className="about-speech-bubble"></div>
          <div id="tom-contents" className="about-person-contents">
            <p id="tom-description" className="about-person-description">Hey! I'm Tom Ames, the software engineer behind Kick It. I love building intuitive and useful websites! Check out my github and LinkedIn below.</p>
            <div id="tom-links" className="about-person-all-links">
              <a href="https://github.com/Tsames" id="tom-github" className="about-person-link">Github</a>
              <p className="about-person-link">tsamesdev@gmail.com</p>
              <a href="https://www.linkedin.com/in/thomasames/" id="tom-linkedin" className="about-person-link">LinkedIn</a>
            </div>
          </div>
        </div>
        <div id="about-chris" className="about-person">
          <div id="chris-contents" className="about-person-contents">
            <p id="chris-description" className="about-person-description">Hello! I am Christopher Brand, a fellow UX Designer with Kick It. Check out my socials and portfolio!</p>
            <div id="chris-links" className="about-person-all-links">
              <a href="http://chrisbrand.squarespace.com/" id="chris-portfolio" className="about-person-link">Portfolio</a>
              <p href="" id="chris-email" className="about-person-link">chrisbrandux@gmail.com</p>
              <a href="https://www.linkedin.com/in/brandchristopher" id="chris-linkedin" className="about-person-link">LinkedIn</a>
            </div>
          </div>
          <div id="chris-image" className="about-person-image"></div>
          <div id="chris-speech-bubble" className="about-speech-bubble"></div>
        </div>
        <div id="about-wallpaper"></div>
        <div id="about-amelia" className="about-person">
          <div id="amelia-image" className="about-person-image"></div>
          <div id="amelia-speech-bubble" className="about-speech-bubble"></div>
          <div id="amelia-contents" className="about-person-contents">
            <p id="amelia-description" className="about-person-description">Hi! Im Amelia Schooley, a UX designer here at Kick It. Im passionate about using psychology and empathy to design useful products. Check out my portfolio and socials!</p>
            <div id="amelia-links" className="about-person-all-links">
              <a href="https://ameliaschooley.com/" id="amelia-portfolio" className="about-person-link">Portfolio</a>
              <p id="amelia-email" className="about-person-link">Schooley.ux@gmail.com</p>
              <a href="https://www.linkedin.com/in/ameliaschooley/" id="amelia-linkedin" className="about-person-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUs;