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
    ? "Write your opinion in favour"
    : "Write your opinion in against";
  const label = !!docRef
  ? `replying...`
  : infavour
  ? "In Favour"
  : "In Against";

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
      <form className="commentbox" style={{
            border: infavour ? "1px solid #4bd97e" : "1px solid #ff0000",
            borderRadius:"10px"
          }}  onSubmit={sendComment}>
        <div className="commentboc__profileIcon" >
        <Avatar
          style={{ marginLeft: "15px", marginTop: "17px" }}
          src={`${userIcon}`}
        ></Avatar>
        </div>
        <div className="coomentBox__mid" >

        <TextField
          className="commentbox__input"
          placeholder={inputplaceholder}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rowsMax={4}
          label={label}
          multiline
        />
        </div>
        <div className="coomentBox__right" >
        {!!docRef ? <p>{" "}</p> : (
          <div
            onClick={() => handleCommentSupport()}
            className="commentbox__thumb"
          >
            <IconButton>
              {infavour ? <ThumbUpAltIcon   style={{color:"#4bd97e"}}  /> : <ThumbDownIcon  style={{color:"#ff0000"}} />}
            </IconButton>
          </div>
        )}
        <div
          style={{
            backgroundColor: "#0284fe",
            borderBottomRightRadius:"10px",
            borderTopRightRadius:"10px",
            alignItems:"center",
            justifyContent:"center",
            display:"flex",
            flex:0.15
          }}
        >
          <IconButton onClick={sendComment}>
            <SendIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        </div>
      </form>
    </div>
  );
}

export default CommentBox;
