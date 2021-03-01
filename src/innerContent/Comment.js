import { ChatBubbleOutline, VerifiedUser } from '@material-ui/icons'
import React from 'react'
import './Comment.css'
import {Avatar} from '@material-ui/core'
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import PublishIcon from "@material-ui/icons/Publish";


function Comment({
    displayName,
    username,
    text,
    avatar
}) {
    return (
        <div className="comment1">
            <div className="comment__avatar">
                <Avatar src="https://houstontamilchair.org/wp-content/uploads/2020/07/parent-directory-avatar-2png-avatar-png-256_256.png"></Avatar>
            </div>
            <div className="comment__body">
                <div className="comment__header">
                    <div className="comment__headerText">
                         <h3>Ayush Sahu <span className="comment__headerSpecial"> @ayushsahu </span> </h3>
                    </div>
                    <div className="comment__headerDescription">
                        <p>I totally agree with farmer protest. count me in the protest</p>
                    </div>
                </div>
                <div className="comment_footer">
                    <ThumbUpAltOutlinedIcon fontSize="small" />
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <RepeatIcon fontSize="small" />
                    <PublishIcon fontSize="small" />
                    
                </div>
            </div>
        </div>
    )
}

export default Comment