import { React } from 'react';
import { motion } from 'framer-motion';

//Styling
import './../styles/test_page.scss';

const TestPage = () => {

  const swirl = {
    initial: { width: "3rem", height: "3rem" },
    animate: { width: "10rem", height: "10rem" },
    transition: { duration: 3 }
  }



  return (
    <motion.div id="test" className="" initial={swirl.initial} animate={swirl.animate} transition={swirl.transition}>

    </motion.div>
  )
}

export default TestPage;