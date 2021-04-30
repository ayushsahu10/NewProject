import React, { useState, useEffect } from "react";
import "./Poll.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import { IconButton } from "@material-ui/core";
import { auth } from "./firebase.js";
import db from "./firebase.js";
import {  BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

export default function Poll({ favour, against, postId,alert }) {
  const [like, setLike] = useState(!!favour ? favour : []);
  const [dislike, setDisLike] = useState(!!against ? against : []);

  const uid = auth.currentUser !== null ? auth.currentUser.uid : "";

  const [fav, setFav] = useState(
    parseFloat(like.length / (like.length + dislike.length)).toFixed(2)
  );
  const [ag, setAg] = useState(
    parseFloat(dislike.length / (like.length + dislike.length)).toFixed(2)
  );

  useEffect(() => {
    setFav(parseFloat(like.length / (like.length + dislike.length)).toFixed(2));
    setAg(
      parseFloat(dislike.length / (like.length + dislike.length)).toFixed(2)
    );
  }, [like, dislike]);

  const updateLike = () => {
    console.log(postId, like);
    let l = [...like];

    if(!uid){
      alert("info","Login to website...");
      <Redirect to="/search" />
      return;
    }

    if (dislike.includes(uid)) {
      updateDislike();
    }
    if (like.includes(uid)) {
      l = l.filter((lk) => lk !== uid);
      setLike(l);
    } else {
      l.push(uid);
      setLike(l);
    }

    db.collection("posts")
      .doc(postId)
      .update({
        favour: l,
      })
      .then(() => console.log("like updated"));
  };

  const updateDislike = () => {
    let l = [...dislike];
    if(!uid){
      alert("info","Login to website...");
      return;
    }
    if (like.includes(uid)) updateLike();
    if (dislike.includes(uid)) {
      l = l.filter((dl) => dl !== uid);
      setDisLike(l);
    } else {
      l.push(uid);
      setDisLike(l);
    }
    db.collection("posts")
      .doc(postId)
      .update({
        against: l,
      })
      .then(() => console.log("dislikes updated"));
  };
  
  const nFormatter = (num) => {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}


  return (
    <div className="poll">
      <div
        className="poll__left"
        style={{
          borderRight: "none",
          flex: `${fav}`,
          borderColor: "#4bd97e",
          borderWidth: "2px",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      >
        <div className="poll__leftSection">
          <IconButton onClick={updateLike}>
            {like.includes(uid) ? (
              <ThumbUpAltIcon style={{ fontSize: "20px", color: "#4bd97e" }} />
            ) : (
              <ThumbUpOutlinedIcon style={{ fontSize: "20px" }} />
            )}
          </IconButton>
        </div>
        <div className="poll__line">
          <p style={{ color: "color: #323435;" }}>
            {parseFloat(fav * 100).toFixed(0)}%
          </p>
          <p className="poll__linePara" style={{ borderColor: "#4bd97e" }}>
            {nFormatter(like.length)} Votes
          </p>
        </div>
      </div>
      <div
        className="poll__right"
        style={{
          borderLeft: "none",
          flex: `${ag}`,
          borderColor: "#ff0000",
          borderWidth: "2px",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <div className="poll__line">
          <p style={{ color: "color: #323435;" }}>{ag * 100}%</p>
          <p className="poll__linePara" style={{ borderColor: "#ff0000" }}>
            {nFormatter(dislike.length)} Vote{" "}
          </p>
        </div>
        <div className="poll__leftSection">
          <IconButton onClick={updateDislike}>
            {dislike.includes(uid) ? (
              <ThumbDownIcon style={{ fontSize: "20px", color: "#FF0000" }} />
            ) : (
              <ThumbDownAltOutlinedIcon style={{ fontSize: "20px" }} />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
