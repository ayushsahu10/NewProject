import React, { useState } from "react";
import "./InnerContent.css";
import { Button, makeStyles, IconButton } from "@material-ui/core";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Poll from "../Poll";
import Comment from "./Comment";
import { Avatar } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const options = ["Select opinion", "Favour", "Againt"];

const defaultOption = options[0];

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
  },
}));

function InnerContent({ children }) {

  const classes = useStyles();
  const [isMore, setIsMore] = useState(false);
  const [infavour, setInfavour] = useState(true);
  const inputColor = infavour ? '#00FF84' : '#FF0000'
  const inputplaceholder = infavour ? "favour" : "against";


  const handleCommentSupport = () => {
    setInfavour(!infavour)
  } 

  return (
    <div className="main">
      <div className="main__heading" ><h1>#2020–2021 Indian farmers' protest</h1></div>
      <div className="innerContent__top">
        <div className="content">
          <img src="../download.jpg"></img>
        </div>

        <div className="pollcss">
          <div className="pollcss__left" >
          <Poll />
          </div>
          <div className="pollcss__right" >
          <div >
          <IconButton>
            <ChatBubbleIcon />
            </IconButton>
             <p>3.3k comments</p>
          </div>
          <div>
          <IconButton>
            <ShareIcon />
            </IconButton>
            <p>3.3k shares</p>
          </div>
          <div>
          <IconButton>
          <BookmarkBorderIcon />
          </IconButton>
          <p>save </p>
          </div>
          <div onClick={()=>setIsMore(!isMore)} >
          
          <IconButton> {isMore ? <ExpandLessIcon /> : <ExpandMoreIcon />  }</IconButton>
          {isMore ? <p>Less </p> : <p>More </p>}
          </div>
          </div>
        </div>

        <p className="main__para" >
          The farmers fear that the bills would render the current Minimum
          Support Price (MSP) procurement system ineffective and they would be
          forced to make distress sales to private companies. b, leaving them at
          the mercy of “big farmers”
        </p>
        <Divider />
        {/* <div className={isHidden ? classes.hidden : null}>{children}</div>
        <Button size="medium" onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? "⬇ More" : "⬆ Less"}
        </Button> */}
        <div className="comment__top">
          <h2>3.3k Total opinions</h2>
          <Dropdown
            options={options}
            className="myClassName"
            value={defaultOption}
            placeholder="Select an option"
          />
        </div>

        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <div className="bottombox"  >
        <form style={{backgroundColor:inputColor}}>
          <div className="bottombox__input" >
            <Avatar src="https://houstontamilchair.org/wp-content/uploads/2020/07/parent-directory-avatar-2png-avatar-png-256_256.png"></Avatar>
            <TextField
            style={{backgroundColor:'#FFF',display:"flex",flex:1,marginLeft:"10px"}}
              id="standard-textarea"
              placeholder={"  write your opinion in  " + inputplaceholder }
              rowsMax={4}
              multiline
              variant="outlined"
            />
          </div>
          <div onClick={() => handleCommentSupport()} >
          
          <IconButton> {infavour ? <ThumbUpAltIcon /> : <ThumbDownIcon />  }</IconButton>
          {/* {infavour ? <p>InFavour </p> : <p>Against </p>} */}
          </div>
          <IconButton> <SendIcon /></IconButton>
        </form>
      </div>
    </div>
  );
}

export default InnerContent;
