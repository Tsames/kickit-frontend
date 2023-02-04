//Dependencies
import { React } from 'react';
import { useParams } from 'react-router-dom';

//Styling
import '../../styles/page_styling/share.scss';

const Created = ({ URL }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */

  //Get Id from params
  const id = useParams().id;

  const newEventURL = URL + id;

  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */


  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="created-shell">
      <div></div>
    </div>
  )
}

export default Created;