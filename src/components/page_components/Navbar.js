//Dependencies
import { React, useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        <Link to="/"><h1 id="navbarHomeButton" className="">Kick It</h1></Link>
      </div>
      <div id="navRight">
        <Link to="/example"><button id="navbarDemo" className="navItem">Demo</button></Link>
        <Link to="/about/how"><button id="navbarAboutUs" className="navItem">About Us</button></Link>
        <Link to="/create"><button id="navbarCreate" className="">Create Event</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;