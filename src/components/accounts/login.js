//Dependencies
import { React, useState } from 'react';
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

  const url = process.env.KICKIT_BACKEND + "/users/login";

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //Helper function (handleSubmit) - makes an HTTP Post request to the proper backend endpoint
  const login = async () => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  };

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */
  
  //Handler function - Updates Credentials state upon change in login fields
  function handleCredentialChange(event) {
    let newValue = event.target.value;
    setCredentials({ ...credentials, [event.target.name]: newValue });
  }

  //Handler function - Upon Submission of login form sends HTTP POST Request
  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="login-shell">
      <div id="login-content">
        <h1>Log In</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-emailAddress" id="login-emailAddress-label" className="login-fields">
            <span id="login-emailAddress-placeholder" className="login-fields-placeholder">Email Address</span>
            <input required type="text" id="login-emailAddress" name="login-emailAddress" value={credentials.email} placeholder="" onChange={handleCredentialChange} />
          </label>
          <label htmlFor="login-password" id="login-password-label" className="login-fields">
            <span id="login-password-placeholder" className="login-fields-placeholder">Password</span>
            <input required type="text" id="login-password" name="login-password" value={credentials.password} placeholder="" onChange={handleCredentialChange} />
          </label>
          <label htmlFor="login-submit" id="login-submit-label">
            <input required type="submit" id="login-submit" name="login-submit" value="Login!" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default Login;