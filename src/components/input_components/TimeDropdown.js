//Dependencies
import { React } from 'react';

//Styling
import '../../styles/input_styling/time_drop_down.scss';

const TimeDropdown = ({form, name, text, value, doThis}) => {

  return (
    <label id={`${form}${name}`} for={name} className={"time-drop-down"}>
      <span>{text}</span>
      <select name={name} value={value} onChange={doThis}>
        <option value="1">1:00 AM</option>
        <option value="2">2:00 AM</option>
        <option value="3">3:00 AM</option>
        <option value="4">4:00 AM</option>
        <option value="5">5:00 AM</option>
        <option value="6">6:00 AM</option>
        <option value="7">7:00 AM</option>
        <option value="8">8:00 AM</option>
        <option value="9">9:00 AM</option>
        <option value="10">10:00 AM</option>
        <option value="11">11:00 AM</option>
        <option value="12">12:00 PM</option>
        <option value="13">1:00 PM</option>
        <option value="14">2:00 PM</option>
        <option value="15">3:00 PM</option>
        <option value="16">4:00 PM</option>
        <option value="17">5:00 PM</option>
        <option value="18">6:00 PM</option>
        <option value="19">7:00 PM</option>
        <option value="20">8:00 PM</option>
        <option value="21">9:00 PM</option>
        <option value="22">10:00 PM</option>
        <option value="23">11:00 PM</option>
        <option value="24">12:00 AM</option>
      </select>
    </label>
  )
}

export default TimeDropdown;