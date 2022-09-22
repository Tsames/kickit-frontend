//Dependencies
import { React } from 'react';

//Styling
import '../../styles/input_styling/field.scss';

const Field = ({form, type, placeholder = "", name, text, value, doThis}) => {

  return (
    <label htmlFor={name} id={`${form}-${name}`} className={"custom-field"}>
      <input required type={type} name={name} value={value} placeholder={placeholder} onChange={doThis} />
      <span className={"placeholder"}>{text}</span>
    </label>
  )
}

export default Field;