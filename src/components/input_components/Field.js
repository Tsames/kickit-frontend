//Dependencies
import { React } from 'react';

//Styling
import '../../styles/input_styling/field.scss';

const Field = ({form, type, name, text, value, doThis}) => {

  return (
    <label htmlFor={name} id={`${form}-${name}`} className={"custom-field"}>
      <input required type={type} name={name} value={value} onChange={doThis} />
      <span className={"placeholder"}>{text}</span>
    </label>
  )
}

export default Field;