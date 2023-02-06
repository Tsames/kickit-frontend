//Dependencies
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Styling
import '../../../styles/Accounts/Forgot-Password/forgotPassword.scss';

const ForgotPassword = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  let navigate = useNavigate();

  //State that stores the input for the search bar
  const [email, setEmail] = useState();

  const url = process.env.KICKIT_BACKEND + "/users/login";

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  //Helper function (handleSubmit) - makes an HTTP Post request to the proper backend endpoint
  const sendEmailConfirmation = async () => {
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
    sendEmailConfirmation();
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="forgot-password-shell">
      <div id="forgot-password-content">
        <h1>Forgot your password?</h1>
        <p>
          Kick-it has you covered!
          Just enter the email address that your account is associated with below.
          If there is an existing account with the provided email address we will send you an email to enter a new password.
          Once you've finished up here, you will have thirty minutes to complete the process outlined below.
          <br></br><br></br>
          First, check your email inbox (make sure to check your spam folder as well) for an email from no-reply@kick-it.live.
          This email will contain a link, please click on it and direct your web browser to the relevant url.
          You will then arrive at a new page that will have you input your new password.
          Enter a new password and submit it!
        </p>
        <form id="forgot-password-form" onSubmit={handleSubmit}>
          <label htmlFor="forgot-password-emailAddress" id="forgot-password-emailAddress-label" className="forgot-password-fields">
            <span id="forgot-password-emailAddress-placeholder" className="forgot-password-fields-placeholder">Email Address</span>
            <input required type="email" id="forgot-password-emailAddress" name="forgot-password-emailAddress" value={email} placeholder="" onChange={handleChangeEmail} />
          </label>
          <label htmlFor="forgot-password-submit" id="forgot-password-submit-label">
            <input required type="submit" id="forgot-password-submit" name="forgot-password-submit" value="Send Email!" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;