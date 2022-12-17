//Dependencies
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Styling
import '../../styles/Accounts/login.scss';

const Login = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //State that stores the input for the search bar
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const SEARCH_URL = process.env.REACT_APP_BACKEND_API_BASE_URI + "users/login";

  /* ------------------------------------------ Helper Functions ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="login-shell">
      <div id="home-content">
        <h1>Kick it</h1>
        <label htmlFor="search" id="search-Label">
          <input id="search" type="text" name="search" value={search} onChange={handleChange} onKeyDown={handleSearch} placeholder="enter your event's id" />
          {/* <button id="search-button" onClick={handleSearch}><BiSearchAlt id="search-icon"></BiSearchAlt></button> */}
        </label>
      </div>
    </div>
  )
}

export default Login;