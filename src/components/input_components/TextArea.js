//Dependencies
import { React } from 'react';

//Styling
import '../../styles/input_styling/text_area.scss';

const TextArea = ({form, rows, cols, name, text, value, doThis}) => {

  return (
    <label for={name} id={`${form}-${name}`} className={`custom-field-ta`}>
      <textarea wrap="hard" required rows={rows} cols={cols} name={name} value={value} onChange={doThis}/>
      <span className={"placeholder-ta"}>{text}</span>
    </label>
  )
}

export default TextArea;