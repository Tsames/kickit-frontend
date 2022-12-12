//Dependencies
import { React } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//Styling
import '../../styles/page_styling/footer.scss';

const Footer = () => {

  /* ------------------------------------------ Component Variables ------------------------------------------ */

  const location = useLocation().pathname;
  const rightPlace = ['/', '/create']
  
  const shouldFoot = () => {
    return rightPlace.includes(location);
  }

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  const display = () => {
    return (

      <p id='footer'>created by <Link id="footerLink" to="/about/who">Tom Ames, Amelia Schooley, and Chris Brand</Link></p>     

    )
  }

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <>
      { shouldFoot() ? display() : null}
    </>
  )
}

export default Footer;