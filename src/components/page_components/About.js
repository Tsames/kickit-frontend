//Dependencies
import { React, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

//Styling
import '../../styles/page_styling/about.scss';

const About = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //Get desired section from params
  const selectedPage = useLocation().pathname;

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  useEffect(() => {
    helperOnPage();
    document.getElementById('root').className = 'rb-about';
  });

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
      <>
        <div id="findEventBlock">
          <h3>Finding your event</h3>
          <p>

          Upon visiting Kick-It, a user will want to find their event's dedicated page.
          The first and easiest way to find your event is to use a direct link.
          The organizer of your event, whether it be you or another, will receive a link upon creating an event that they can then distribute to all potential attendees.
          Otherwise, if you've misplaced your link or never got one you can enter your event's unique id in the search bar on the home page.<br></br><br></br>
          </p>
          <p id="noticeText">* Please note, if you are here just to view and test out the web app's functionality you'll want to click on the example option in the top right of your screen.</p>
        </div>

        <div id="signUpBlock">
          <h3>Signing Up</h3>
          <p>
          Once you've found your events dedicated page you'll want to sign up for the event.
          You can sign up for the event by first inputing the name you'd like to be listed under.
          Then click and drag among the grid to highlight the times that you are available to attend the event.
          Once you have submitted your availability you can edit the date and times that you previously submitted by resubmitting under the same name.
          However, an important consequence of this design is that any given attendee must submit their availability under a unique name.
          If they do not, their submission will overwrite another attendee's submission.
          The Kick-it app does try and catch these potential mishaps by warning the user when the name they are submitting under is already taken and will replace existing data.<br></br>
          </p>
        </div>

        <div id="viewingBlock">
          <h3>Viewing Availability</h3>
          <p>
            Great, now that you've entered your own availability you'll be curious to view everyone elses'.
            
          </p>
        </div>

        <div id="createEventBlock">
          <h3>Creating your own Event</h3>
          <p>
            Creating your own event on Kick it is very simple.
            Click on the 'create' option in the top right of your screen.
            You'll be asked to input a title, location, description, time range, and potential days for your event.
            Choose carefully when entering these details, as of the first iteration of kick it there are no accounts.
            This means you do not have to create an account to make your own event.
            It also means that you don't have the luxury of editting your event once it has been created.
          </p>
        </div>

        <div id="distributingEventBlock">
          <h3>Sharing your Event</h3>
          <p>
            Great
          </p>
        </div>
      </>
    )
  }

  const aboutWho = () => {
    return (
      <>
        <div id="author-block">
          <h3>Author</h3>
          <p>
          <span id="smallBranding">Kick-it</span> was created by <a className="aboutLink" href="https://www.linkedin.com/in/thomasames">Tom Ames</a>.
          </p>
        </div>
        <div id="tech-block">
          <h3>Tech Used</h3>
          <p>
            Kick-it's front-end was created with React, React-router, React Icons, and a lot of custom styling featuring Scss.
            The backend was created with Node, Express, Mongoose and MongoDB.
            If you are interested in taking a closer look at the code you can find the Github repositories for both the frontend and backend below.
          </p>
          <div id="tech-links">
            <a className="aboutLink" href="https://github.com/Tsames/kickit-frontend">Kick-it frontend</a>
            <a className="aboutLink" href="https://github.com/Tsames/kickit-backend-node">Kick-it backend</a>
          </div>
        </div>
        <div id="future-features-block">
          <h3>Future Features</h3>
          <p>
            
          </p>
        </div>
      </>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="about-shell">
    <div id="about-top">
        <h1 id="welcome-heading">Welcome to Kick it</h1>
        <div id="aboutSections">
          <Link to="/about/how"><button id="toAboutHow" className="aboutClickables aboutSection">How its Works</button></Link>
          <Link to="/about/who"><button id="toAboutWho" className="aboutClickables aboutSection">Author & Tech</button></Link>
        </div>
      </div>
      <div id="about-body">
        { selectedPage === '/about/how' ? aboutHow() : aboutWho() }
      </div>
    </div>
  )
}

export default About;