//Dependencies
import { React } from 'react';

//Styling
import '../../styles/small/question.scss';

const Question = ({form, type, name, text, value, doThis}) => {

  return (
    <div className={`${form}Block`}>
      <label for={name} className={`${form}Label`}>{text}</label><br/>
      <input id={`${form}${name}`} className={`${form}Input`} type={type} name={name} value={value} onChange={doThis}/>
    </div>
  )
}

export default Question;