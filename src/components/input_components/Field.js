//Dependencies
import { React } from 'react';

//Styling
import '../../styles/input_styling/field.scss';

const Field = ({form, type, name, text, value, doThis}) => {

  return (
    <label for={name} id={`${form}-${name}`} className={`${form}-custom-field`}>
      <input type={type} name={name} value={value} onChange={doThis} />
      <span className={"placeholder"}>{text}</span>
    </label>
  )
}

export default Field;