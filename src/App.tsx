//Dependencies
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

//Import Nav & Footer Components
import Navbar from './components/navigation_components/navbar';
import Footer from './components/navigation_components/footer';

//Import Account Components
// import Login from './components/Accounts/Login';
// import Signup from './components/Accounts/Signup/Signup';
// import ForgotPassword from './components/Accounts/Forgot-Password/ForgotPassword'

//Import Main Pages
import Home from './components/home_page/Home';
import Create from './components/create_pages/create_page/create';
import Created from './components/create_pages/created_page/created';
import AboutUs from "./components/about_us_page/aboutUs";

function App() {

  /* ------------------------------------------ App Wide Variables and State ------------------------------------------ */

  /* Data of the event is stored in event state at App.js to eliminate the need to repeatedly query the database.

  We also store data called blocks which is data that facilitates the creation of grids in the AttendanceChart.js and Grid.js components
  to visually represent availability */

  //Event Interface
 interface eventInterface {
    _id: string;
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
  }

  //Stores the data of an event
  const [event, setEvent] = useState<eventInterface>({
    _id: "1234",
    title: "Lorem ipsum dolor",
    location: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    early: 5,
    late: 19,
    days: []
  });

  const BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND;
  // const BACKEND_URL = process.env.REACT_APP_KICKIT_DEV_BACKEND;

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Passing Functions ------------------------------------------ */

  /* Passing Function - Searches for a specific Id, if none exists returns false.
  If an event with the given Id does exist returns true and sets state */
  const getEventData = async (id : string) :Promise<boolean> => {
    try {
      //Fetch event data
      const response = await fetch(BACKEND_URL + `${id}`);
      const data = await response.json()

      //Set event state
      setEvent(data);

      //Return true
      return true;

    } catch (error) {
      console.log("Couldn't get event.");
      console.log(error);
      return false;
    }
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <>
      <AnimatePresence>
        <Navbar eventId={event._id} />
        <Routes>

          {/* Accounts Routes */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirm-account" element={<ForgotPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<ForgotPassword />} /> */}

          {/* Main Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create getEventData={getEventData} />} />
          <Route path='/created/:id' element={<Created getEventData={getEventData} event={event} />} />
          <Route path='/about' element={<AboutUs />} />

        </Routes>
        <Footer />
      </ AnimatePresence>
    </>
  );
}

export default App;