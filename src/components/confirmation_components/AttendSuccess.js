//Dependencies
import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//Styling
import '../../styles/confirmation_styling/attend_success.scss';

const AttendSuccess = () => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */
  
  //Get Id from params
  const id = useParams().id;

  let navigate = useNavigate();

  /* ------------------------------------------ Helper Functions ------------------------------------------ */

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */

  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div className="attend-success-wrapper">
    
    </div>
  )
}

export default AttendSuccess;