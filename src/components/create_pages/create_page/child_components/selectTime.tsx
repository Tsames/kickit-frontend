//Dependencies
import React, { FC, useState } from "react";
import { motion } from 'framer-motion';

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/selectTime.scss';

//Props Interface
interface SelectTimeProps {
  elementId: string;
  toggle: boolean;
  text: string;
}

const SelectTime: FC<SelectTimeProps> = ({ elementId, toggle, text }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //TypeScript Declaration of state
  interface Time {
    number: number;
    tod: 'AM' | 'PM';
  }

  //State
  const [time, setTime] = useState<Time>({
    number: 0,
    tod: 'AM'
  });

  /* ------------------------------------------ Animation Details (Framer-Motion) ------------------------------------------ */

  //Container (#navbar-shell) Variant
  const parentVariant = {
    inactive: {
        opacity: 0,
        width: 0,
        height: 0,
        transition: { type: "spring", stiffness: 400, damping: 30 }
    },
    active: {
      opacity: 1,
      width: "calc(5rem + 12vw)",
      transition: { type: "spring", stiffness: 400, damping: 30, delay: 0.3 }
    }
  }

  //Hover
  const optionHover = {
    scale: 1.1,
    color: "#3d4bc6",
    transition: {
        duration: 0.3
    }
  }

  //Tap
  const optionTap = {
    scale: 0.9,
    color: "#014D59",
    transition: {
        duration: 0.3
    }
  }

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  const convertData = () :number => {
    if(time.tod === "PM" && time.number !== 12) {
      return time.number + 12;
    } else if (time.number === 12 && time.tod === "AM") {
      return 24
    } else {
      return time.number;
    }
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  const handleSetNumber = (event : any) :void => {
    setTime({...time, "number": Number(event.target.dataset.value)});
  }

  const handleSetTod = (event : any) :void => {
    setTime({...time, "tod": event.target.dataset.value});
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <motion.div className="select-time-wrapper" id={elementId} variants={parentVariant} initial={false} animate={toggle ? "active" : "inactive"}>
        <motion.nav>
            <p>{text}</p>
            <p>{`${time.number} ${time.tod}`}</p>
        </motion.nav>
        <motion.div className="select-time-options">
            <motion.ul className="select-time-list-number">
                <motion.li className={time.number === 1 ? "select-time-option selected" : "select-time-option"} data-value={1} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>1</motion.li>
                <motion.li className={time.number === 2 ? "select-time-option selected" : "select-time-option"} data-value={2} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>2</motion.li>
                <motion.li className={time.number === 3 ? "select-time-option selected" : "select-time-option"} data-value={3} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>3</motion.li>
                <motion.li className={time.number === 4 ? "select-time-option selected" : "select-time-option"} data-value={4} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>4</motion.li>
                <motion.li className={time.number === 5 ? "select-time-option selected" : "select-time-option"} data-value={5} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>5</motion.li>
                <motion.li className={time.number === 6 ? "select-time-option selected" : "select-time-option"} data-value={6} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>6</motion.li>
                <motion.li className={time.number === 7 ? "select-time-option selected" : "select-time-option"} data-value={7} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>7</motion.li>
                <motion.li className={time.number === 8 ? "select-time-option selected" : "select-time-option"} data-value={8} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>8</motion.li>
                <motion.li className={time.number === 9 ? "select-time-option selected" : "select-time-option"} data-value={9} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>9</motion.li>
                <motion.li className={time.number === 10 ? "select-time-option selected" : "select-time-option"} data-value={10} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>10</motion.li>
                <motion.li className={time.number === 11 ? "select-time-option selected" : "select-time-option"} data-value={11} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>11</motion.li>
                <motion.li className={time.number === 12 ? "select-time-option selected" : "select-time-option"} data-value={12} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>12</motion.li>
            </motion.ul>
            <motion.ul className="select-time-list-tod">
                <motion.li className={time.tod === "AM" ? "select-time-option-tod selected" : "select-time-option-tod"} data-value={"AM"} whileHover={optionHover} whileTap={optionTap} onClick={handleSetTod}>AM</motion.li>
                <motion.li className={time.tod === "PM" ? "select-time-option-tod selected" : "select-time-option-tod"} data-value={"PM"} whileHover={optionHover} whileTap={optionTap} onClick={handleSetTod}>PM</motion.li>
            </motion.ul>
        </motion.div>
    </motion.div>
  )
}

export default SelectTime;