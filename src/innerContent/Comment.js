import React, { useState, useEffect } from "react";
import "./Comment.css";
import { Avatar } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import db from "../firebase";
import { IconButton } from "@material-ui/core";
import CommentBox from '../CommentBox.js';
import firebase from 'firebase'


function Comment({
  uid,
  text,
  name,
  userName,
  icon,
  like,
  dislike,
  reply,
  postId,
  replyUid,
  postReply
}) {

    
  const [likes, setLikes] = useState(typeof like !== "undefined" ? like : []);
  const [dislikes, setDisLikes] = useState(
    typeof dislike !== "undefined" ? dislike : []
  );
  const [iconUrl, setIconUrl] = useState(icon);
  const [replyInput, setReplyInput] = useState(false);
  const commentRef = reply ? db.collection("posts").doc(postId).collection("comments").doc(uid).collection("replies").doc(replyUid) :  db.collection("posts").doc(postId).collection("comments").doc(uid);

  const pressLike = () => {
    console.log(reply,replyUid,uid)
    let l = [...likes];
    if(dislikes.includes('JTxOVoaP5yKJrDZUwQUd')){
        pressDislike()
    }
    if (likes.includes("JTxOVoaP5yKJrDZUwQUd")) {
      l = l.filter((lk) => lk !== "JTxOVoaP5yKJrDZUwQUd");
      setLikes(l);
    } else {
      l.push("JTxOVoaP5yKJrDZUwQUd");
      setLikes(l);
    }

    commentRef.update({
        like:l
    }).then(()=>console.log('like updated'))

  };

  const pressDislike = () => {
    let l = [...dislikes];
    if(likes.includes('JTxOVoaP5yKJrDZUwQUd')) pressLike();
     if (dislikes.includes("JTxOVoaP5yKJrDZUwQUd")) {
      l = l.filter((dl) => dl !== "JTxOVoaP5yKJrDZUwQUd");
      setDisLikes(l);
    } else {
      l.push("JTxOVoaP5yKJrDZUwQUd");
      setDisLikes(l);
    }
    commentRef.update({
        dislike:l
    }).then(()=>console.log('dislikes updated'))
  };

 

  return (
    <div>
    <div className="comment1">
      <div className="comment__header">
        <Avatar src={`${iconUrl}`}></Avatar>
        <div className="comment__headerText">
            <h3>
              {name}
              <span className="comment__headerSpecial"> @{userName} </span>
            </h3>
          </div>
      </div>
      <div className="comment__body">
        <div className="comment__headerDescription"> 
            <p>{text}</p>
          </div>
        <div className="comment_footer">
          <div className="comment__footerDiv" onClick={pressLike}>
            <IconButton>
              {likes.includes("JTxOVoaP5yKJrDZUwQUd") ? (
                <ThumbUpIcon fontSize="small" color={'primary'}  />
              ) : (
                <ThumbUpAltOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            <p>{likes.length} </p>
          </div>
          <div className="comment__footerDiv" onClick={pressDislike}>
            <IconButton>
              {dislikes.includes("JTxOVoaP5yKJrDZUwQUd") ? (
                <ThumbDownIcon fontSize="small" color={'primary'} />
              ) : (
                <ThumbDownAltOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            <p>{dislikes.length} </p>
          </div>
          <div className="comment__footerDiv" onClick={()=>setReplyInput(!replyInput)} >
            <p>reply</p>
          </div>
        </div>
      </div>
      </div>
      {replyInput ?  <CommentBox  postComment={postReply} docRef={uid} replyName={userName} setReplyInput={setReplyInput} /> : null}
    </div>
  );
}

export default Comment;
