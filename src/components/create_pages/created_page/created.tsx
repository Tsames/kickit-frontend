//Dependencies
import React from "react";
import { FC } from 'react';

//Import Components
import CopyLink from './child_components/copyLink';

//Styling
import '../../../styles/create_pages_styling/created_page/created.scss';

//Props Interface
interface createdProps  {
  event: {
    _id: string;
    title: string;
    location: string;
    description: string;
    early: number;
    late: number;
    days: number[];
  };
}

const Created: FC<createdProps> = ({ event }) => {

  /* ------------------------------------------ Component Variables & State ------------------------------------------ */


  /* ------------------------------------------ Event Handler Functions ------------------------------------------ */

  

  /* ------------------------------------------ Conditional JSX ------------------------------------------ */


  /* ------------------------------------------ Returning JSX ------------------------------------------ */

  return (
    <div id="created-shell">
      <div id="created-top-section">
        <h3 id="created-top-text" className="no-select">Lets</h3>
        <h1 id="created-top-header" className="no-select">Kick It</h1>
      </div>
      <div id="created-mid-section">
        <div id="created-mid-left-section">
          <h3>Title: </h3>
        </div>
        <div id="created-mid-right-section">
        </div>
      </div>
      <div id="created-bottom-section">
        <CopyLink></CopyLink>
      </div>
    </div>
  )
}

export default Created;