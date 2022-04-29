//Dependencies
import { React } from 'react';

//Styling
import '../../styles/small/question.scss';

const Question = ({form, type, name, text, value, doThis}) => {

  return (
    <label for={name} className={`${form}Question`}>
      <input id={`${form}${name}`} className={`${form}Input`} type={type} name={name} value={value} onChange={doThis} />
      <span for={name} className={`${form}QuestionLabel`}>{text}</span>
    </label>
  )
}

export default Question;