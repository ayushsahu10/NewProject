import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./commentbox.css";
import { Button, makeStyles, IconButton } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SendIcon from "@material-ui/icons/Send";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
  },
}));

function CommentBox({ postComment,docRef, replyName , setReplyInput}) {
  const classes = useStyles();
  const [infavour, setInfavour] = useState(true);
  const [input, setInput] = useState('');
  const inputplaceholder = infavour ? "favour" : "against";
  
  const handleCommentSupport = () => {
    setInfavour(!infavour);
  };


  const sendComment = (e) => {
    e.preventDefault();
    if(input.trim().length){
      if(typeof docRef === 'undefined') postComment(input.trim(),e);
      else{
        postComment(input.trim(),docRef,replyName);
        setReplyInput(false);
      }
      setInput('');
    }
  }

  return (
    <div>
       <form className="commentbox"
                    onSubmit={sendComment}
                >
          <Avatar
            style={{ marginLeft: "15px", marginTop: "17px" }}
            src="https://houstontamilchair.org/wp-content/uploads/2020/07/parent-directory-avatar-2png-avatar-png-256_256.png"
          ></Avatar>
            <input
              className="commentbox__input"
              style={{
                borderBottom: infavour ? "3px solid green" : "3px solid red",
              }}
              placeholder={"  Write your opinion in  " + inputplaceholder}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rowsMax={4}
              multiline
            ></input>

          <div
            onClick={() => handleCommentSupport()}
            className="commentbox__thumb"
          >
            <IconButton>
              {infavour ? <ThumbUpAltIcon /> : <ThumbDownIcon />}
            </IconButton>
            <p>{infavour ? <text>In Favour</text> : <text>In Against</text>}</p>
          </div>
          <IconButton onClick={sendComment} >
            <SendIcon />
          </IconButton>
          </form> 
        
    </div>
  );
}

export default CommentBox;
