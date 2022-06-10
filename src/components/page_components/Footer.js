//Dependencies
import { React } from 'react';

//Styling
import '../../styles/page_styling/footer.scss';

const Footer = () => {

  return (
    <div className="page-footer">
      <a id="footer-left-side" className="footerLink" href="https://github.com/Tsames/kickit-frontend">github</a>
      <p id="footer-right-side">created by <a className="footerLink" href="https://www.linkedin.com/in/thomasames/">Tom Ames</a></p>
    </div>
  )
}

export default Footer;