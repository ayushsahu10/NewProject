import React from 'react';
import './AboutTab.css';
import Poll from "./Poll";
import { Link } from "react-router-dom";

function AboutTab() {
    return (
        <div>
            <Link to={`/feed/1236`}>
        <div className="about__tab">
        <img src="farmer.jpg"></img>

        <div className="innerpara">
          <h2>2020–2021 Indian farmers' protest</h2>
          

           <Poll />
          <p>
          You have voted for <span className="about__poll"> disagree </span> on this Poll.
          </p>
        </div>
        
      </div>
    </Link>
        </div>
    )
}

export default AboutTab
