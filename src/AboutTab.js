import React from "react";
import "./AboutTab.css";
import Poll from "./Poll";
import { Link } from "react-router-dom";

function AboutTab({  uid, headLine, img, favour, against }) {
  return (
    <Link to={`/feed/${uid}`}>
      <div className="about__tab">
        
        <div className="innerpara">

        <img src={`${img}`}></img>

          <h2> {headLine.slice(0,50)}...</h2>

        </div>
        <Poll favour={favour} against={against} />
      </div>
    </Link>
  );
}

export default AboutTab;
