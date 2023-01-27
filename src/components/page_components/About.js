//Dependencies
import { React, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Styling
// import '../../styles/page_styling/about.scss';

// const About = () => {

//   /* ------------------------------------------ Component Variables & State ------------------------------------------ */

//   //Get desired section from params
//   const selectedPage = useLocation().pathname;

//   //Framer-Motion Page Transition Settings
//   const fade = {
//     "initial": { opacity: 0 },
//     "animate": { opacity: 1 },
//     "exit": { opacity: 0 },
//     "transition": { duration: 0.5 }
//   }

//   const shuffle = {
//     "initial": { width: 0 },
//     "animate": { width: "80%" },
//     "exit": { x: window.innerWidth },
//     "transition": { duration: 0.3 }
//   }

//   const compress = {
    
//   }


//   /* ------------------------------------------ Helper Functions ------------------------------------------ */

//   useEffect(() => {
//     helperOnPage();
//     // document.getElementById('root').className = 'rb-about';
//   });

//   const helperOnPage = () => {
//     if (selectedPage === '/about/how') {
//       document.getElementById('toAboutHow').classList.add('aboutSectionActive');
//       document.getElementById('toAboutWho').classList.remove('aboutSectionActive');
//     } else {
//       document.getElementById('toAboutWho').classList.add('aboutSectionActive');
//       document.getElementById('toAboutHow').classList.remove('aboutSectionActive');
//     }
//   }

//   /* ------------------------------------------ Conditional JSX ------------------------------------------ */

//   const aboutHow = () => {
//     return (
//       <>

//         <div id="whatIsIt" className="how-section">
//           <h3>What is Kick-it?</h3>
//           <p>

//           Kick-It is a web-app designed to be a quick and effective way to find the best day and time for your event.
//           The idea is simple, first you create an event, then pass out the link to your friends, family, and other propsective attendees.
//           With the link in hand, attendees can input and submit their availability.
//           The collective availability of all prospective attendees is displayed at all times so that both Organizer and attendees alike can easily find the day and time that is best for their event.
//           <br></br><br></br>

//           </p>
//           <p id="noticeText">
//            * Please note, if you are here just to view and test out the web app's functionality you'll want to click on the example option in the top right of your screen.
//            This will take you to a mock event where you are free to enter new availabilities and poke around with the viewing tools.
//           </p>
//         </div>

//         <div id="findEventBlock" className="how-section">
//           <h3>Finding your event</h3>
//           <p>

//           Upon visiting Kick-It, a user will want to find their event's dedicated page.
//           The first and easiest way to find your event is to use a direct link.
//           The organizer of your event, whether it be you or another, will receive a link upon creating an event that they can then distribute to all potential attendees.
//           Otherwise, if you've misplaced your link or never got one you can enter your event's unique id in the search bar on the home page.
//           </p>
//         </div>

//         <div id="signUpBlock" className="how-section">
//           <h3>Signing Up</h3>
//           <p>
//           Once you've found your events dedicated page you'll want to sign up for the event.
//           To sign up for an event you'll need to make sure that <span className="fancyfont">"Sign Up!"</span> is selected right below the event description.
//           You can sign up for the event by first inputing the name you'd like to be listed under.
//           Then click and drag among the grid to highlight the times that you are available to attend the event.
//           <br></br><br></br>

//           Once you have submitted your availability you can edit the date and times that you previously submitted by resubmitting under the same name.
//           However, an important consequence of this design is that any given attendee must submit their availability under a unique name.
//           If they do not, their submission will overwrite another attendee's submission.
//           The Kick-it app does try and catch these potential mishaps by warning the user when the name they are submitting under is already taken and will replace existing data.<br></br>
//           </p>
//         </div>

//         <div id="viewingBlock" className="how-section">
//           <h3>Viewing Availability</h3>
//           <p>
//             Great, now that you've entered your own availability you'll be curious to view everyone elses'.
//             When you navigate to an event's dedicated page you will automatically be viewing the collective availability.
//             However, if you've just signed up you want to make sure that "View Availability" is selected right below the event description.
//             <br></br><br></br>

//             There are two different modes when viewing availability.
//             All Attending and Mouseover mode.
//             The All Attending mode displays the availability and lists the names of all potential attendees.
//             Cells will be colored red, orange, yellow, and various shades of green to indicate the number of attendees that are available at that time.
//             In this mode you can click on the name of any individual name to visually isolate that attendee's availability.
//             To remove this focus on one attendee's availability simple click their name again.
//             <br></br><br></br>

//             To switch to Mouseover mode click on the icon resembling a cursor.
//             This mode will list only those attnedees who are available at the time that you are mousing over with your cursor.
//             You can switch back to All Attending mode at any time by clicking on the icon resembling people.
//           </p>
//         </div>

//         <div id="createEventBlock" className="how-section">
//           <h3>Creating your own Event</h3>
//           <p>
//             Creating your own event on Kick it is very simple.
//             Click on the 'create' option in the top right of your screen.
//             You'll be asked to input a title, location, description, time range, and potential days for your event.
//             <br></br><br></br>

//             Choose carefully when entering these details, as of the first iteration of kick it there are no accounts.
//             This means you do not have to create an account to make your own event.
//             It also means that you don't have the luxury of editting your event once it has been created.
//           </p>
//         </div>

//         <div id="distributingEventBlock" className="how-section">
//           <h3>Sharing your Event</h3>
//           <p>
            
//           </p>
//         </div>
//       </>
//     )
//   }

//   const aboutWho = () => {
//     return (
//       <>
//         <div id="author-block" className="who-section">
//           <h3>Author</h3>
//           <p>
//           <span id="smallBranding">Kick-it</span> was created by <a id="tomAmes" className="aboutLink" href="https://www.linkedin.com/in/thomasames">Tom Ames</a>.
//           </p>
//         </div>

//         <div id="tech-block" className="who-section">
//           <h3>Tech Used & Repositories</h3>
//           <p>
//             Kick-it's front-end was created with React, React-router, React Icons, and a lot of custom styling featuring Scss.
//             The backend was created with Node, Express, Mongoose and MongoDB.
//             If you are interested in taking a closer look at the code you can find the Github repositories for both the front-end and back-end below.
//           </p>
//           <div id="tech-links">
//             <a className="aboutLink" href="https://github.com/Tsames/kickit-frontend">Kick-it frontend</a>
//             <a className="aboutLink" href="https://github.com/Tsames/kickit-backend-node">Kick-it backend</a>
//           </div>
//         </div>

//         <div id="future-features-block" className="who-section">
//           <h3>Future Enhancements</h3>
//           <p>
//             In the future I would like to add the following features to the Kick-It web app.  
//           </p>
//           <ol>
//             <li>User Accounts</li>
//             <p>
//               I designed the first iteration of kick it without user authentication or authorization.
//               I wanted the app to be helpful, easy to use, and require minimal setup to get going.
//               While being able to create and interact with events without the need for an account is refreshing, it does come with some downsides.
//               Some of the pain points that arise from a lack of authentication and authorization include but probably are not limited to the following:
//             </p>
//             <ul>
//               <li>Organizers of events have no way to edit an event after making it.</li>
//               <li>
//                 Organizers of events are only given one opportunity to make note of their new events' id or direct link.
//                 If they fail to record either before leaving the website there is no way for them to find either item again.
//               </li>
//               <li>
//                 If users had accounts and some way of linking or connecting with each other then Kick it's home page could be more interactive.
//                 It might feature and draw a users' attention to upcoming events organized by friends or family members.
//               </li>
//             </ul>

//             <li>More Advanced Search</li>
//             <p>
//               The current search functionality on the home page is rather simple.
//               You enter the id of the event you are looking for and it takes you to that event's dedicated page.
//               I would really like to add the ability to search for the event's title as its much more human friendly.
//               The results of a more advanced search on event title should give the user a small menu from which they can choose on what they think is the most relevant event.
//               Ideally, this menu would also filter out events if the latest proposed date had already passed.
//             </p>
//             <li>Better Event Options</li>
//             <p>
//               Events, as they are right now, are very straightforward with minimal data required to be input to make one.
//               I think the very low requirement to create and distribute an event is a positive, however I think there is a lot of room to explore optional data for events to hold.
//               There is a lot of unexplored possibility to improving the data that an event holds.
//               To name one, location could be enhanced to offer a selection via google maps or something of the like.
//               <br></br><br></br>

//               This conversation gets even more interesting if we consider accounts.
//               If users were able to make accounts and connect with one another, the app might have the potential to recognize social circles and automatically suggest or distribute new events.
//             </p>
//             <li>Style Enhancements</li>
//             <p>
//               I'll be the first to admit I'm not a designer.
//               However, I'd still love to continue to spice up Kick-It with additional style tweaks.
//               I am particularlly interested in adding page transitions, text and component animations, and small effects that make the web app feel very responsive and smooth.
//             </p>
//             <li>Tech Endeavors</li>
//             <p>
//               I am currently in the midst of learning TypeScript and Jest.
//               The first iteration of Kick-It did not use either technology.
//               I would love to incorporate both into the project as future enhancements are added.
//             </p>
//           </ol>
//         </div>
//       </>
//     )
//   }

//   /* ------------------------------------------ Returning JSX ------------------------------------------ */

//   return (
//     <motion.div id="about-shell" initial={shuffle.initial} animate={shuffle.animate} exit={shuffle.exit} transition={shuffle.transition}>
//       <div id="about-top">
//         <h1 id="welcome-heading">Welcome to Kick-it</h1>
//         <div id="aboutSections">
//           <Link to="/about/how"><button id="toAboutHow" className="aboutClickables aboutSection">How its Works</button></Link>
//           <Link to="/about/who"><button id="toAboutWho" className="aboutClickables aboutSection">Author & Tech</button></Link>
//         </div>
//       </div>
//       <div id="about-body">
//         { selectedPage === '/about/how' ? aboutHow() : aboutWho() }
//       </div>
//     </motion.div>
//   )
// }

// export default About;