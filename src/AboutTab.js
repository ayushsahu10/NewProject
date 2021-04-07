import React from "react";
import "./AboutTab.css";
import Poll from "./Poll";
import { Link } from "react-router-dom";

function AboutTab({ search, uid, headLine, img, favour, against }) {
  return (
    <Link to={`/feed/${uid}`}>
      <div className="about__tab">
        
        <div className="innerpara">

        <img src={`${img}`}></img>

          <h2># {headLine.slice(0,50)}...</h2>

        </div>
        {search ? null : (
            <p>
              You have voted for <span className="about__poll"> disagree </span>{" "}
              on this Poll.
            </p>
          )}

        <Poll favour={favour} against={against} />
      </div>
    </Link>
  );
}

export default AboutTab;
