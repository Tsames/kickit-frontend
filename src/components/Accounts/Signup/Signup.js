//Dependencies
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Styling
import '../../../styles/Accounts/Signup/signup.scss';

const Signup = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //State that stores the input for the search bar
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const url = process.env.KICKIT_BACKEND + "/users/login";

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //Helper function (handleSubmit) - makes an HTTP Post request to the proper backend endpoint
  const sendEmailConfirmation = async () => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });
  };

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Handler function - Updates Credentials state upon change in login fields
  function handleNewAccountChange(event) {
    let newValue = event.target.value;
    setNewAccount({ ...newAccount, [event.target.name]: newValue });
  }

  //Handler function - Upon Submission of login form sends HTTP POST Request
  function handleSubmit(event) {
    event.preventDefault();
    sendEmailConfirmation();
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="signup-shell">
      <div id="signup-content">
        <h1>Sign Up!</h1>
        <form id="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name" id="signup-name-label" className="signup-fields">
            <span id="signup-name-placeholder" className="signup-fields-placeholder">Name</span>
            <input required type="text" id="signup-name" name="signup-name" value={newAccount.name} placeholder="" onChange={handleNewAccountChange} />
          </label>
          <label htmlFor="signup-emailAddress" id="signup-emailAddress-label" className="signup-fields">
            <span id="signup-emailAddress-placeholder" className="signup-fields-placeholder">Email Address</span>
            <input required type="email" id="signup-emailAddress" name="signup-emailAddress" value={newAccount.email} placeholder="" onChange={handleNewAccountChange} />
          </label>
          <label htmlFor="signup-password" id="signup-password-label" className="signup-fields">
            <span id="signup-password-placeholder" className="signup-fields-placeholder">Password</span>
            <input required type="password" id="signup-password" name="signup-password" value={newAccount.password} placeholder="" onChange={handleNewAccountChange} />
          </label>
          <label htmlFor="signup-confirm-password" id="signup-confirm-password-label" className="signup-fields">
            <span id="signup-confirm-password-placeholder" className="signup-fields-placeholder">Re-enter Password</span>
            <input required type="password" id="signup-confirm-password" name="signup-confirm-password" value={newAccount.confirmPassword} placeholder="" onChange={handleNewAccountChange} />
          </label>
          <label htmlFor="signup-submit" id="signup-submit-label">
            <input required type="submit" id="signup-submit" name="signup-submit" value="Create Account" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default Signup;