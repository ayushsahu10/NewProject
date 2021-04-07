import React from "react";
import "./Widgets.css";
import SearchIcon from "@material-ui/icons/Search";
import Header from './Header.js';
import WhatshotIcon from '@material-ui/icons/Whatshot';

function Widgets() {
  return (
    <div className="widgets">
      <div className='header' >
            <WhatshotIcon  fontSize={'large'} />
            <p>Trending</p>
        </div>
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
      </div>
    </div>
  );
}

export default Widgets;