//Dependencies
import React, { FC, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowDown } from "react-icons/hi";

//Styling
import '../../styles/home_styling/home.scss';

//Props Interface
interface homeProps {

}

const Home: FC<homeProps> = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  const elementRef = useRef<HTMLDivElement | null>(null);
  const landingRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (#navbar-shell) Variant
  const homeContainerVariant = {
    initial: { 
      x: "-100vw",
    },
    animate: {
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        when: "beforeChildren" 
      }
    },
    exit: {}
  }

  //Child Variants
  const childButtonVariant = {
    initial: { 
      opacity: 0 
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.6
      }
    },
    exit: {}
  }

  /* --------------- Gestures --------------- */

  //Hover
  const buttonItemHover = {
    scale: 1.1,
    borderWidth: "max(0.4rem, 0.4vw)",
    transition: {
      duration: 0.2,
    }
  }

  //Tap
  const buttonItemTap = {
    scale: 0.9,
    backgroundColor: "#2b37a5"
  }

  //In Viewport Variants
  const scrollVariant = {
    initial: { 
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.4
      }
    }
  }


  /* ------------------------------------------ Helper Functions ------------------------------------------ */
  
  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  const scrollDown = () => {
    elementRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
  }

  const getStarted = () => {
    landingRef.current?.scrollIntoView({behavior: "smooth", block: "center"})
    setTimeout(() => {
      navigate('/create');
    }, 50)
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="home-shell" variants={homeContainerVariant} initial="initial" animate="animate" exit="exit">
      <div id="home-landing" ref={landingRef}>
        <Link id="create-event-button-link" to="/create"><motion.button id="create-event-button" variants={childButtonVariant} whileHover={buttonItemHover} whileTap={buttonItemTap}>Create an Event</motion.button></Link>
        <motion.button id="scroll-down-button" variants={childButtonVariant} whileHover={buttonItemHover} whileTap={buttonItemTap} onClick={scrollDown}><HiArrowDown></HiArrowDown></motion.button>
      </div>
      <div id="home-testimonials" ref={elementRef}>
        <div id="home-testimonial-one" className="no-select">
          <h1 id="home-testimonial-quote-one" className="home-testimonial-quote">"Kick It makes it so easy to hang with my pals. Scheduling sucks without it!"</h1>
          <p id="home-testimonial-speaker-one" className="home-testimonial-speaker">-Jimbo</p>
        </div>
      </div>
      <div id="home-contents" className="no-select">
        <div id="home-wallpaper"></div>
        <div id="home-content-block-one">
          <div id="home-content-graphic-one" className="home-content-graphic"></div>
          <p id="home-content-text-one" className="home-content-text">Create an event and choose a few potential days and times for it.</p>
          <motion.div id="home-content-graphic-two" className="home-content-graphic" variants={scrollVariant} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}></motion.div>
        </div>
        <div id="home-content-block-two">
          <div id="home-content-block-two-text-wrapper">
            <p id="home-content-text-two" className="home-content-text">Share the event with your friends and see when they are free.</p>
          </div>
          <div id="home-content-graphic-three" className="home-content-graphic"></div>
          <motion.div id="home-content-graphic-four" variants={scrollVariant} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }} className="home-content-graphic"></motion.div>
        </div>
        <div id="home-content-block-three">
          <div id="home-content-block-three-text-wrapper">
            <p id="home-content-text-three" className="home-content-text">Pick the best day and time for everyone!</p>
            <p id="home-content-text-four" className="home-content-text">Its time to...</p>
            <p id="home-content-text-five" className="home-content-text">Kick It!</p>
          </div>
          <motion.div id="home-content-graphic-six" className="home-content-graphic" variants={scrollVariant} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.8 }}></motion.div>
          <div id="home-content-graphic-five" className="home-content-graphic"></div>
        </div>
        <div id="get-started-wrapper">
          <motion.button id="get-started" onClick={getStarted} variants={childButtonVariant} whileHover={buttonItemHover} whileTap={buttonItemTap}>Get Started</motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default Home;