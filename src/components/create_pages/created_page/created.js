//Dependencies
import { React } from 'react';
import { useParams } from 'react-router-dom';

//Styling
import '../../../styles/create_pages_styling/created_page/created.scss';

const Created = ({}) => {

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