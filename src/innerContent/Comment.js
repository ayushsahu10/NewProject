import React, { useState, useEffect } from "react";
import "./Comment.css";
import { Avatar } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import db from "../firebase";
import { IconButton } from "@material-ui/core";
import CommentBox from "../CommentBox.js";
import firebase from "firebase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReportIcon from "@material-ui/icons/Report";
import DeleteIcon from "@material-ui/icons/Delete";

const options = ["Delete", "Report"];

const ITEM_HEIGHT = 50;

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
  postReply,
}) {
  const [likes, setLikes] = useState(typeof like !== "undefined" ? like : []);
  const [dislikes, setDisLikes] = useState(
    typeof dislike !== "undefined" ? dislike : []
  );
  const [iconUrl, setIconUrl] = useState(icon);
  const [replyInput, setReplyInput] = useState(false);
  const commentRef = reply
    ? db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(uid)
        .collection("replies")
        .doc(replyUid)
    : db.collection("posts").doc(postId).collection("comments").doc(uid);

  const pressLike = () => {
    console.log(reply, replyUid, uid);
    let l = [...likes];
    if (dislikes.includes("JTxOVoaP5yKJrDZUwQUd")) {
      pressDislike();
    }
    if (likes.includes("JTxOVoaP5yKJrDZUwQUd")) {
      l = l.filter((lk) => lk !== "JTxOVoaP5yKJrDZUwQUd");
      setLikes(l);
    } else {
      l.push("JTxOVoaP5yKJrDZUwQUd");
      setLikes(l);
    }

    commentRef
      .update({
        like: l,
      })
      .then(() => console.log("like updated"));
  };

  const pressDislike = () => {
    let l = [...dislikes];
    if (likes.includes("JTxOVoaP5yKJrDZUwQUd")) pressLike();
    if (dislikes.includes("JTxOVoaP5yKJrDZUwQUd")) {
      l = l.filter((dl) => dl !== "JTxOVoaP5yKJrDZUwQUd");
      setDisLikes(l);
    } else {
      l.push("JTxOVoaP5yKJrDZUwQUd");
      setDisLikes(l);
    }
    commentRef
      .update({
        dislike: l,
      })
      .then(() => console.log("dislikes updated"));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="comment1">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", margin: "2px" }}>
            <Avatar
              src={`${iconUrl}`}
              style={{ marginTop: "5px", marginRight: "10px" }}
            ></Avatar>
            <div
              style={{
                backgroundColor: "#f0f2f5",
                borderRadius: "20px",
                display: "inline-block",
                padding: "10px",
              }}
            >
              <div className="comment__header">
                <div className="comment__headerText">
                  <h3>
                    {name}
                    <span className="comment__headerSpecial">
                      {" "}
                      @{userName}{" "}
                    </span>
                  </h3>
                </div>
              </div>
              <div className="comment__headerDescription">
                <p>{text}</p>
              </div>
            </div>
          </div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="comment__body">
          <div className="comment_footer">
            <div className="comment__footerDiv" onClick={pressLike}>
              <IconButton>
                {likes.includes("JTxOVoaP5yKJrDZUwQUd") ? (
                  <ThumbUpIcon fontSize="small" style={{ color: "#0284fe" }} />
                ) : (
                  <ThumbUpAltOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <p>{likes.length} </p>
            </div>
            <div className="comment__footerDiv" onClick={pressDislike}>
              <IconButton>
                {dislikes.includes("JTxOVoaP5yKJrDZUwQUd") ? (
                  <ThumbDownIcon
                    fontSize="small"
                    style={{ color: "#0284fe" }}
                  />
                ) : (
                  <ThumbDownAltOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <p>{dislikes.length} </p>
            </div>
            <div
              className="comment__footerDiv"
              onClick={() => setReplyInput(!replyInput)}
            >
              <p>reply</p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "85%",
          marginLeft: "50px",
        }}
      >
        {replyInput ? (
          <CommentBox
            postComment={postReply}
            docRef={uid}
            replyName={userName}
            setReplyInput={setReplyInput}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Comment;
