//Dependencies
import { React } from 'react';

//Styling
import '../../styles/small/questionta.scss';

const QuestionTA = ({form, rows, cols, name, text, value, doThis}) => {

  return (
    <div className={`${form}Block`}>
      <label for={name} className={`${form}Label`}>{text}</label><br />
      <textarea id={`${form}${name}`} className={`${form}Input`} rows={rows} cols={cols} name={name} value={value} onChange={doThis} />
    </div>
  )
}

export default QuestionTA;