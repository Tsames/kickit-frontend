//Dependencies
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Styling
import '../../../styles/Accounts/Forgot-Password/newPassword.scss';

const NewPassword = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //State that stores the input for the search bar
  const [newPassword, setNewPassword] = useState({
    password: "",
    passwordConfirm: ""
  });

  const url = process.env.KICKIT_BACKEND + "/users/login";

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //Helper function (handleSubmit) - makes an HTTP Post request to the proper backend endpoint
  const submitNewPassword = async () => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
  };

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  //Handler function - Updates Credentials state upon change in login fields
  function handleChangeEmail(event) {
    let newValue = event.target.value;
    setEmail(newValue);
  }

  //Handler function - Upon Submission of login form sends HTTP POST Request
  function handleSubmit(event) {
    event.preventDefault();
    submitNewPassword();
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="new-password-shell">
      <div id="new-password-content">
        <h1>Enter your new Password.</h1>
        <form id="new-password-form" onSubmit={handleSubmit}>
          <label htmlFor="new-password-emailAddress" id="new-password-emailAddress-label" className="new-password-fields">
            <span id="new-password-emailAddress-placeholder" className="new-password-fields-placeholder">Email Address</span>
            <input required type="email" id="new-password-emailAddress" name="new-password-emailAddress" value={email} placeholder="" onChange={handleChangeEmail} />
          </label>
          <label htmlFor="new-password-submit" id="new-password-submit-label">
            <input required type="submit" id="new-password-submit" name="new-password-submit" value="Send Email!" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default NewPassword;