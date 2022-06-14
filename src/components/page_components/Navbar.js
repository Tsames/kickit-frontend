//Dependencies
import { React} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiHome2Fill } from "react-icons/ri";

//Styles
import '../../styles/page_styling/navbar.scss';

const Navbar = (props) => {

  /* ------------------------------------------ Component Variables ------------------------------------------*/

  const location = useLocation().pathname;

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/
  const noUser = (
    <>
      <Link to='/login' className="navItem">Log In</Link>
      <Link to='/signup' className="navItem">Sign Up</Link>
    </>
  )

  const home = (
    <Link to="/" className="navItem"><RiHome2Fill id="home" /></Link>
  )

  /* ------------------------------------------ Returning JSX ------------------------------------------*/
  return (
    <nav className="page-top">
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