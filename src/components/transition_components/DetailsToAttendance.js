//Dependencies
import { React } from 'react';

//Styling
import '../../styles/transition_styling/details-to-attendance.scss';

const TransitionDetailsToAttendance = ({ move }) => {

  return (
    <>
      <div id="transitionLeft" className="transition-base-left"></div>
      <div id="transitionRight" className="transition-base-right"></div>
    </>
  )
}

export default TransitionDetailsToAttendance;