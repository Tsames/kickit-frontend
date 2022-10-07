//Dependencies
import { React, useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiHome2Fill } from "react-icons/ri";

//Styling
import '../../styles/page_styling/navbar.scss';

const Navbar = () => {

  /* ------------------------------------------ Component Variables ------------------------------------------ */

  const pages = ['/', '/create', '/example', '/about/how', '/about/who']
  const buttons = ['navbarHomeButton', 'navbarCreateButton', 'navbarExampleButton', 'navbarAboutButton', 'navbarAboutButton'];

  const location = useLocation().pathname;
  const lastLocation = useRef(null);


  useEffect(() => helperOnPage());

  const helperOnPage = () => {
    let buttonChecker;
    pages.forEach((element, index) => {
      if (location === element) {
        document.getElementById(buttons[index]).classList.add('navOnPage');
        buttonChecker = buttons[index];
      } else if (element === lastLocation.current && buttonChecker !== buttons[index]) {
        document.getElementById(buttons[index]).classList.remove('navOnPage');
      }
    });

    lastLocation.current = location;
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <nav id="navbar-shell">
      <div id="navLeft">
        <Link to="/"><RiHome2Fill id="navbarHomeButton" className="navItem hoverEffect"/></Link>
      </div>
      <div id="navRight">
        <Link to="/create"><button id="navbarCreateButton" className="navItem hoverEffect">Create</button></Link>
        <Link to="/example"><button id="navbarExampleButton" className="navItem hoverEffect">Example</button></Link>
        <Link to="/about/how"><button id="navbarAboutButton" className="navItem hoverEffect">About</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;