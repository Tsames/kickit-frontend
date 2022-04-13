//Dependencies
import { React } from 'react';

//Styling
import '../../styles/small/questionta.scss';

const QuestionTA = (props) => {

  //Helper Variables
  const form = props.questionArray[0];
  const rows = props.questionArray[1][0];
  const cols = props.questionArray [1][1];
  const name = props.questionArray[2];
  const text = props.questionArray[3];
  const value = props.questionArray[4];
  const handleChange = props.questionArray[5];

  return (
    <div className={`${form}Block`}>
      <label for={name} className={`${form}Label`}>{text}</label><br />
      <textarea id={`${form}${name}`} className={`${form}Input`} rows={rows} cols={cols} name={name} value={value} onChange={handleChange} />
    </div>
  )
}

export default QuestionTA;