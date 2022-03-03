//Dependencies
import { useState, React } from 'react';

//Styles
import '../styles/grid.scss';

const Grid = (props) => {

  const addActiveClass = (e) => {
    e.target.className = " gridCell gridActive"
  }

  const removeActiveClass = (e) => {
    e.target.className = "gridCell";
  }

  return (
    <div className="gridTable">
      <div className="gridContents">
        <div id="1" className="gridColumn">
          <div id="1" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="2" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="3" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="4" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="5" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="6" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="7" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="8" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="9" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="10" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
        </div>
        <div id="2" className="gridColumn">
          <div id="1" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="2" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="3" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="4" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="5" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="6" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="7" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="8" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="9" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="10" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
        </div>
        <div id="3" className="gridColumn">
          <div id="1" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="2" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="3" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="4" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="5" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="6" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="7" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="8" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="9" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="10" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
        </div>
        <div id="4" className="gridColumn">
          <div id="1" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="2" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="3" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="4" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="5" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="6" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="7" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="8" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="9" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="10" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
        </div>
        <div id="5" className="gridColumn">
          <div id="1" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="2" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="3" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="4" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="5" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="6" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="7" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="8" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="9" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="10" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
        </div>
        <div id="6" className="gridColumn">
          <div id="1" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="2" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="3" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="4" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="5" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="6" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="7" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="8" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="9" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
          <div id="10" className="gridCell" onMouseEnter={addActiveClass} onMouseLeave={removeActiveClass}></div>
        </div>
      </div>
    </div>
  );
};

export default Grid;