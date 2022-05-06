//Dependencies
import { React } from 'react';

//Styling
import '../../styles/small/questionta.scss';

const QuestionTA = ({form, rows, cols, name, text, value, doThis}) => {

  return (
    <label for={name} id={`${form}-${name}`} className={`${form}-custom-field`}>
      <textarea rows={rows} cols={cols} name={name} value={value} onChange={doThis}/>
      <span className={"placeholder-ta"}>{text}</span>
    </label>
  )
}

export default QuestionTA;