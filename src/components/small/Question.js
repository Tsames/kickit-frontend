//Dependencies
import { React } from 'react';

const Question = (props) => {

  //Helper Variables
  const text = props.text
  const name = props.name;
  const type = props.type;
  const form = props.form;
  const value = props.value;
  const handleChange = props.handleChange;

  return (
    <div className={`${form}Block`}>
      <label for={name} className={`${form}Label`}>{text}</label><br />
      <input id={`${form}Name`} className={`${form}Input`} type={type} name={name} value={value} onChange={handleChange} />
    </div>
  )
}

export default Question;