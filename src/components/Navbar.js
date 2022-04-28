//Dependencies
import { useState, React} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiUser, BiX } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";

//Styles
import '../styles/navbar.scss';

const Navbar = (props) => {

  const [mo, setMo] = useState(false)

  const handleMouseEnter = () => {
    setMo(true);
  }

  const handleMouseLeave = () => {
    setMo(false)
  }

  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', { withCredentials: true })
      .then(response => {
        props.handleLogout()
        props.history.push('/')
      })
      .catch(error => console.log(error))
  }

  const noUser = (
    <>
      <Link to='/login' className="navItem">Log In</Link>
      <Link to='/signup' className="navItem">Sign Up</Link>
    </>
  )

  const yesUser = (
    <>
      {props.user ? 
      <>
        <BiUser className="navItem"></BiUser>
        <h5 className="navItem">{props.user.username}</h5>
      </>
       : null}
      <BiX className="navItem"></BiX>
      { mo ? <Link to='/logout' className="navItem" onClick={handleClick}>Logout</Link> : null }
    </>
  )

  return (
    <nav className="pageTop">
      <div className="navLeft">
        <Link to='/'><h1 className="navTittle">Kick <span className="ItColor">It</span></h1></Link>
      </div>
      <div className="navRight" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {
          props.loggedInStatus ? yesUser : noUser
        }
      </div>
    </nav>
  );
};

export default Navbar;