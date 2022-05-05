//Dependencies
import { React } from 'react';

//Styling
import '../styles/footer.scss';

const Footer = ({ form, type, name, text, value, doThis }) => {

  const handleMouseEnter = (event) => {
    event.target.classList.add("mouseover");
  }

  const handleMouseLeave = (event) => {
    event.target.classList.remove("mouseover");
  }

  return (
    <div className="page-footer">
      <a id="footer-left-side" href="https://github.com/Tsames/kickit-frontend" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>github</a>
      <p id="footer-right-side">created by <a href="https://www.linkedin.com/in/thomasames/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Tom Ames</a></p>
    </div>
  )
}

export default Footer;