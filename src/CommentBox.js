import React, { useState } from "react";
import "./commentbox.css";
import { Button, makeStyles, IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SendIcon from "@material-ui/icons/Send";
import { Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
  },
}));

function CommentBox({ postComment, docRef, replyName, setReplyInput, notify, userIcon }) {
  const classes = useStyles();
  const [infavour, setInfavour] = useState(true);
  const [input, setInput] = useState("");
  const inputplaceholder = !!docRef
    ? `replying to ${replyName}...`
    : infavour
    ? "Write your opinion in favour..."
    : "Write your opinion in against...";

  const handleCommentSupport = () => {
    setInfavour(!infavour);
  };

  const sendComment = (e) => {
    e.preventDefault();
    if (input.trim().length) {
      if (typeof docRef === "undefined") postComment(input.trim(), infavour, e);
      else {
        postComment(input.trim(), infavour, docRef, replyName);
        setReplyInput(false);
        notify("replied");
      }
      setInput("");
    }
  };

  return (
    <div>
      <form className="commentbox" onSubmit={sendComment}>
        <Avatar
          style={{ marginLeft: "15px", marginTop: "17px" }}
          src={`${userIcon}`}
        ></Avatar>
        <TextField
          className="commentbox__input"
          style={{
            borderBottom: infavour ? "3px solid green" : "3px solid red",
          }}
          placeholder={inputplaceholder}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rowsMax={4}
          label={inputplaceholder}
          multiline
        />
        {!!docRef ? null : (
          <div
            onClick={() => handleCommentSupport()}
            className="commentbox__thumb"
          >
            <IconButton>
              {infavour ? <ThumbUpAltIcon /> : <ThumbDownIcon />}
            </IconButton>
            <p>{infavour ? <text>In Favour</text> : <text>In Against</text>}</p>
          </div>
        )}
        <div
          style={{
            backgroundColor: "#0284fe",
            borderRadius: "10px",
            height: "50px",
            width: "50px",
          }}
        >
          <IconButton onClick={sendComment}>
            <SendIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </form>
    </div>
  );
}

export default CommentBox;
