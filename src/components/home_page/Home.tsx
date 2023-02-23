//Dependencies
import React, { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
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

  //Svg Variants
  const svgVariant = {
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

  //Path Body Variant
  const pathBodyVariant = {
    initial: { 
      pathLength: 0 ,
      opacity: 0
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0,
        duration: 2
      }
    },
    exit: {}
  }

  //Path Arrowhead Variant
  const pathHeadVariant = {
    initial: { 
      pathLength: 0,
      opacity: 0
    },
    animate: {
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: 2,
        duration: 1
      }
    },
    exit: {}
  }

  /* --------------- Gestures --------------- */

  //Hover
  const buttonItemHover = {
    scale: 1.3,
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
    document.body.scrollTop = 0;
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div id="home-shell" variants={homeContainerVariant} initial="initial" animate="animate" exit="exit">
      <div id="home-landing">
        <motion.button id="create-event-button" variants={childButtonVariant} whileHover={buttonItemHover} whileTap={buttonItemTap}>Create Your Event</motion.button>
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
          <motion.svg id="home-content-graphic-four" className="home-content-graphic" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path variants={pathBodyVariant} initial="initial" animate="animate" d="M54.1314 4.32009C38.9253 14.8018 28.0517 31.5023 23.0909 49.1923C20.8493 57.3881 19.5993 65.6933 20.1671 74.1989C20.6249 82.1857 23.2311 90.4094 26.2598 97.8354C27.7099 101.372 29.5089 104.779 31.3263 108.019C33.7128 112.166 36.0992 116.312 38.853 120.162C44.2322 127.509 52.1824 132.776 60.2981 136.541C68.8913 140.528 78.1642 142.901 87.3637 144.422C97.5548 146.052 108.334 146.902 118.635 146.011C129.286 144.99 139.772 140.911 146.733 132.391C152.739 124.948 154.503 115.011 150.63 106.141C147.161 98.1602 139.982 91.9653 132.141 88.737C123.493 85.2508 114.073 85.7322 105.478 89.344C87.4082 96.9771 75.0652 116.386 69.8655 134.725C67.1463 144.219 66.0061 154.563 67.9326 164.4C70.116 174.941 75.8255 183.845 84.106 190.668C93.0108 197.897 103.66 202.955 113.833 207.791C124.794 213.052 135.977 217.831 147.416 221.793C170.111 229.867 193.725 235.679 217.596 239.154C223.527 239.977 229.311 240.615 235.279 241.104C240.586 241.52 241.505 233.178 236.199 232.762C191.467 228.844 147.711 216.085 107.83 195.478C99.1268 190.973 89.7992 186.061 83.4469 178.437C77.829 171.739 75.2596 163.182 75.2059 154.564C75.2074 145.446 77.3757 136.397 80.9578 128.181C84.3378 120.279 89.0399 112.523 95.2292 106.451C101.235 100.528 108.599 95.9358 117.083 94.8447C124.043 93.9232 131.424 96.7632 136.95 101.256C142.146 105.713 145.469 111.989 144.403 118.626C142.988 126.913 135.495 132.672 128.002 135.393C118.416 138.895 107.325 137.841 97.3726 137.082C89.2564 136.356 81.0668 134.778 73.1345 132.384C65.3858 129.841 57.729 126.464 51.2845 121.195C45.1522 116.128 41.2787 108.778 37.3502 101.928C33.7154 95.4489 31.311 88.4295 29.6045 81.1493C27.8428 74.3695 28.0275 68.1421 28.9651 61.1533C31.1712 45.6926 38.5739 30.1292 49.6852 18.8585C52.6973 15.8133 55.8194 13.2868 59.272 10.7968C61.0901 9.47749 61.2375 6.62313 59.9156 4.95768C58.4469 3.10719 55.9496 3.00077 54.1314 4.32009Z" fill="#FFCC66"/>
            <motion.path variants={pathHeadVariant} initial="initial" animate="animate" d="M168.925 184.482C186.46 195.365 203.003 207.658 218.756 221.045C222.575 224.337 226.541 227.814 230.176 231.254C231.535 232.586 233.389 233.972 234.362 235.768C235.059 237.027 234.692 237.324 233.443 238.031C231.644 239.183 229.715 239.984 227.787 240.784C225.492 241.882 223.049 242.795 220.607 243.708C216.053 245.57 211.37 247.08 206.54 248.405C195.852 251.279 184.779 253.098 173.835 253.749C171.65 253.846 170.015 256.537 170.455 258.612C170.859 261.02 172.897 262.258 175.266 262.012C186.045 261.343 196.769 259.655 207.292 256.762C212.635 255.325 217.998 253.721 223.066 251.746C227.786 249.903 232.836 248.095 237.133 245.529C241.963 242.685 244.516 237.731 242.093 232.399C239.78 227.584 234.823 223.999 231.022 220.54C222.65 213.032 213.911 205.821 204.951 199.092C194.907 191.568 184.662 184.36 174.013 177.782C172.14 176.563 169.606 176.79 168.228 178.664C166.704 180.354 167.034 183.43 168.925 184.482Z" fill="#FFCC66"/>
          </motion.svg>
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
          <Link to="/create" onClick={getStarted}><motion.button id="get-started" variants={childButtonVariant} whileHover={buttonItemHover} whileTap={buttonItemTap}>Get Started</motion.button></Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Home;