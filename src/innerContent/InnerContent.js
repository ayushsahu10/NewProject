import React, { useState } from "react";
import "./InnerContent.css";
import { Button, makeStyles } from "@material-ui/core";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Poll from '../Poll';
import Comment from './Comment'
import {Avatar} from '@material-ui/core'

const options = [
  'Select opinion','Favour', 'Againt'
];

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
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="main">
      <div className="content">
        <h1>2020–2021 Indian farmers' protest</h1>
        <img src="../download.jpg"></img>
      </div>
      <div className="pollcss"><Poll /></div>
      <p>
        The farmers fear that the bills would render the current Minimum Support
        Price (MSP) procurement system ineffective and they would be forced to
        make distress sales to private companies. b, leaving them at the mercy
        of “big farmers”
      </p>
      <div className={isHidden ? classes.hidden : null}>{children}</div>
      <Button size="medium" onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? "⬇ More" : "⬆ Less"}
      </Button>
      <div className="comment">
        <h1>Show Opinion</h1>
        <Dropdown options={options} className="myClassName" value={defaultOption} placeholder="Select an option" />
      </div>
      
    <Comment />
    <Comment />
    <Comment />
    <Comment />
    <div className="bottombox">
      <form>
        <div className="bottombox__input">
        <Avatar src="https://houstontamilchair.org/wp-content/uploads/2020/07/parent-directory-avatar-2png-avatar-png-256_256.png"></Avatar>
        <input placeholder="Show your thoughts!!"></input>
        </div>
        <Button className="bottombox__post">Post</Button>
        
      </form>
    </div>
    </div>
  );
}

export default InnerContent;
