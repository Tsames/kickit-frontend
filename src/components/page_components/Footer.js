//Dependencies
import { React } from 'react';
import { useLocation } from 'react-router-dom';

//Styling
import '../../styles/page_styling/footer.scss';

const Footer = () => {

  /* ------------------------------------------ Component Variables ------------------------------------------*/

  const location = useLocation().pathname === "/";

  /* ------------------------------------------ Conditional JSX ------------------------------------------*/

  const display = () => {
    return (
      <div className="page-footer">
        <a id="footer-left-side" className="footerLink" href="https://github.com/Tsames/kickit-frontend">github</a>
        <p id="footer-right-side">created by <a className="footerLink" href="https://www.linkedin.com/in/thomasames/">Tom Ames</a></p>
      </div>
    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------*/

  return (
    <>
      { location ? display() : null}
    </>
  )
}

export default Footer;