import React from "react";
import "./Cards.css";
import Poll from "./Poll";
import { Link } from "react-router-dom";

function Cards() {
  return (
    <Link to={`/feed/1236`}>
      <div className="cards">
        <img src="farmer.jpg"></img>

        <div className="para">
          <h2>2020–2021 Indian farmers' protest</h2>
          <p>
            The farmers fear that the bills would render the current Minimum
            Support Price (MSP) procurement system ineffective and they would be
            forced to make distress sales to private companies. , leaving them
            at the mercy of “big farmers”
          </p>

          <Poll />
        </div>
      </div>
    </Link>
  );
}
export default Cards;
