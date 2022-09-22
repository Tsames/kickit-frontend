//Dependencies
import { React, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiHome2Fill } from "react-icons/ri";

//Styling
import '../../styles/page_styling/navbar.scss';

const Navbar = () => {

  /* ------------------------------------------ Component Variables ------------------------------------------ */

  const pages = ['/', '/create', '/share/632a01e22b0d76ae11f716bd', '/about']
  const buttons = ['navbarHomeButton', 'navbarCreateButton', 'navbarExampleButton', 'navbarAboutButton'];

  const location = useLocation().pathname;

  useEffect(() => helperOnPage());

  const helperOnPage = () => {
    pages.forEach((element, index) => {
      if (location === element) {
        document.getElementById(buttons[index]).classList.add('navOnPage');
      } else {
        document.getElementById(buttons[index]).classList.remove('navOnPage');
      }
    });
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
        <Link to="/share/632a01e22b0d76ae11f716bd"><button id="navbarExampleButton" className="navItem hoverEffect">Example</button></Link>
        <Link to="/about"><button id="navbarAboutButton" className="navItem hoverEffect">About</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;