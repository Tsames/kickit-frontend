//Dependencies
import { React } from 'react';
import { Link } from 'react-router-dom';

//Styling
import '../../styles/page_styling/home.scss';

const Home = () => {

  return (
    <div className="home-shell page-body">
      <Link id="to-create" to="/create"><button>+</button></Link>
    </div>
  )
}

export default Home;