//Dependencies
import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

//Styles
import '../styles/navbar.scss';

const Navbar = (props) => {

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
      <Link to='/login'>Log In</Link>
      <Link to='/signup'>Sign Up</Link>
    </>
  )

  const yesUser = (
    <>
      {props.user ? <h6>welcome, {props.user.username}!</h6> : null}
      <Link to='/logout' onClick={handleClick}>Logout</Link>
    </>
  )

  return (
    <nav>
      <div className="navLeft">
        <h1>Kick It</h1>
      </div>
      <div className="navRight">
        {
          props.loggedInStatus ? yesUser : noUser
        }
      </div>
    </nav>
  );
};

export default Navbar;