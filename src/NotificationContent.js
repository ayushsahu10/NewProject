import React from 'react'
import {Avatar} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import './NotificationContent.css'
import ModeCommentIcon from '@material-ui/icons/ModeComment';

function NotificationContent() {
    return (
        <div className="notification__content">
         
                <Avatar src="https://houstontamilchair.org/wp-content/uploads/2020/07/parent-directory-avatar-2png-avatar-png-256_256.png"></Avatar>
                <div className="overlay">
                <FavoriteIcon color="secondary" />
                </div>
      
            <p> <span className="notification__username">@ayushthakre</span> liked <span className="notification__username"> your opinion on Farmer's protest</span></p>   
            <span className="notification__time">4 hours ago</span>
            <span className="notification__img" ><img  src="farmer.jpg"></img></span>
        </div>
    )
}

export default NotificationContent
