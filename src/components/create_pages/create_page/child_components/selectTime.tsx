//Dependencies
import React, { FC, BaseSyntheticEvent, useState } from "react";
import { motion } from 'framer-motion';

//Styling
import '../../../../styles/create_pages_styling/create_page/child_components/selectTime.scss';

//Props Interface
interface SelectTimeProps {
  elementId: string;
  text: string;
  toggle: boolean;
  handleChange: (value :number) => void;
}

const SelectTime: FC<SelectTimeProps> = ({ elementId, text, toggle, handleChange }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  interface timeInterface {
    number: number,
    tod: 'AM' | 'PM'
  }

  const [time, setTime] = useState<timeInterface>({
    number: 0,
    tod: 'AM'
  })

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
    scale: 1,
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

  const convertData = (number: number, tod: string): number => {

    //If the time of day is PM and the number is not 12 add 12 to the number.
    if(tod === "PM" && number !== 12) {

      return number + 12;

    //Else if the number is 12 and the time of day is AM return 24.  
    } else if (number === 12 && tod === "AM") {

      return 24

    //Otherwise just return the number as is.
    } else {

      return number;

    }
  }

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  const handleSetNumber = (event: BaseSyntheticEvent) :void => {

    const newValue = convertData(Number(event.target.dataset.value), time.tod);
    handleChange(newValue);

    setTime({...time, "number": Number(event.target.dataset.value)});
  }

  const handleSetTod = (event: BaseSyntheticEvent): void => {

    const newValue = convertData(time.number, event.target.dataset.value);
    handleChange(newValue);

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
                <motion.li className={time.tod === "AM" ? "select-time-option-tod selected" : "select-time-option-tod"} data-value={"AM"} whileHover={optionHover} whileTap={optionTap} onClick={handleSetNumber}>AM</motion.li>
                <motion.li className={time.tod === "PM" ? "select-time-option-tod selected" : "select-time-option-tod"} data-value={"PM"} whileHover={optionHover} whileTap={optionTap} onClick={handleSetTod}>PM</motion.li>
            </motion.ul>
        </motion.div>
    </motion.div>
  )
}

export default SelectTime;