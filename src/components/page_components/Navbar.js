//Dependencies
import { React} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiHome2Fill } from "react-icons/ri";

//Styling
import '../../styles/page_styling/navbar.scss';

const Navbar = () => {

  /* ------------------------------------------ Component Variables ------------------------------------------ */

  const location = useLocation().pathname;

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* There was originally authentication when the app was originally built, but in this version it has been stripped.
  The noUser function is remnants that has not yet been removed because I plan to add authentication at a later date. */

  const noUser = (
    <>
      <Link to='/login' className="navItem">Log In</Link>
      <Link to='/signup' className="navItem">Sign Up</Link>
    </>
  )

  const home = (
    <Link to="/" className="navItem"><RiHome2Fill id="home" /></Link>
  )

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <nav id="navbar" className="page-top">
      <div id="navLeft">
        {location !== "/" ? home : null }
      </div>
      <div id="navRight">
        <Link to="/create"><button className="navItem">+</button></Link>
        <div id="loginBlock">
          {noUser}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;