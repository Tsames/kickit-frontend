//Dependencies
import { React } from 'react';

//Styling
import '../../styles/small/question.scss';

const Question = (props) => {

  //Helper Variables
  const form = props.questionArray[0]
  const type = props.questionArray[1]
  const name = props.questionArray[2]
  const text = props.questionArray[3]
  const value = props.questionArray[4]
  const handleChange = props.questionArray[5]

  return (
    <div className={`${form}Block`}>
      <label for={name} className={`${form}Label`}>{text}</label><br/>
      <input id={`${form}${name}`} className={`${form}Input`} type={type} name={name} value={value} onChange={handleChange}/>
    </div>
  )
}

export default Question;