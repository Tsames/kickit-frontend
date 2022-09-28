//Dependencies
import { React, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

//Styling
import '../../styles/page_styling/about.scss';

const About = ({ setRoot }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //Get desired section from params
  const selectedPage = useLocation().pathname;

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  useEffect(() => helperOnPage());
  setRoot('rb-about');

  const helperOnPage = () => {
    if (selectedPage === '/about/how') {
      document.getElementById('toAboutHow').classList.add('aboutSectionActive');
      document.getElementById('toAboutWho').classList.remove('aboutSectionActive');
    } else {
      document.getElementById('toAboutWho').classList.add('aboutSectionActive');
      document.getElementById('toAboutHow').classList.remove('aboutSectionActive');
    }
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  const aboutHow = () => {
    return (
      <div id="aboutHow-block">

        <div id="findEventBlock">
          <h3>Finding your event</h3>
          <p>

          Upon visiting Kick-It, a user will want to find their event's dedicated page.
          The first and easiest way to find your event is to use a direct link.
          The organizer of your event, whether it be you or not, will receive a link upon creating an event that they can then distribute to all potential attendees.
          Otherwise, if you've misplaced your link or never got one you can enter your event's unique id in the search bar on the home page.<br></br><br></br>

          <span id="noticeText">* Please note, if you are here just to view and test out the web app's functionality you'll want to click on the example option in the top right of your screen.</span>
          </p>
        </div>

        <div id="signUpBlock">
          <h3>Signing Up</h3>
          <p>
          To sign up for an event you'll click on the !
          
          
          A user can sign up for the event by inputing the name they'd like to be listed under and entering the days and times that they are available.
          Once an attendee has submitted their availability they can edit the date and times that they are available at by resubmitting under the same name.
          However, an important consequence of this design is that any given attendee must submit their availability under a unique name.
          If they do not, their submission will overwrite another attendee's submission.
          Kick-it does try and catch these potential mishaps by warning the user when the name they are submitting under is already taken.<br></br>
          </p>
        </div>

        <div id="viewingBlock">
          <h3>Viewing Availability</h3>
          <p>
          Or, alternatively, they can view the availability of everyone who has signed up for the event thus far.
          When viewing the sign ups for the event one can 
          </p>
        </div>

      </div>
    )
  }

  const aboutWho = () => {
    return (
      <div id="aboutWho">
        <div id="author-block">
          <h3>Author</h3>
          <p>
          <span>Kick-it</span> was created by <a className="aboutLink" href="https://www.linkedin.com/in/thomasames">Tom Ames</a>.
          </p>
        </div>
        <div id="techUsed-block">
          <h3>Tech Used</h3>
          <p>
            Kick-it's front-end was created with React, React-router, and a lot of custom styling featuring Scss.
            The backend was created with Node, Express, Mongoose and MongoDB.
            If you are interested in taking a closer look at the code you can find the respective repositories for both the <a className="aboutLink" href="https://github.com/Tsames/kickit-frontend">frontend</a> and the <a className="aboutLink" href="https://github.com/Tsames/kickit-backend-node">backend</a> on Github.
          </p>
        </div>
      </div>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="about-shell">
      <h1 id="welcome-heading">Welcome to Kick it</h1>
      <div id="aboutSections">
        <Link to="/about/how"><button id="toAboutHow" className="aboutClickables aboutSection">How its Works</button></Link>
        <Link to="/about/who"><button id="toAboutWho" className="aboutClickables aboutSection">Author & Tech</button></Link>
      </div>
      { selectedPage === '/about/how' ? aboutHow() : aboutWho() }
    </div>
  )
}

export default About;