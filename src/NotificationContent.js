import React,{useState,useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import './NotificationContent.css'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

function NotificationContent({type}) {

    const [color,setColor] = useState('rgba(255,255,255,1)')

    const setBgColor = () => {
        if(type=='like') setColor('rgba(255, 0, 0, 1)');
        else if(type=='replied') setColor('rgba(125, 134, 248, 1)')
    }

    useEffect(() => {
        setBgColor()
    }, [])

    const Icon = () => {
        if(type=='like') return <FavoriteIcon color="secondary" />;
        else return <QuestionAnswerIcon color="primary" />;
    }

    return (
        <div className="notification__content"  >
         
                <div className="icon" >
                <img  className="icon__image" src="https://houstontamilchair.org/wp-content/uploads/2020/07/parent-directory-avatar-2png-avatar-png-256_256.png" />
                <div className="overlay">
                <Icon />
                </div>
                </div>
      
           <p> <span className="notification__username">@ayushthakre</span> <span style={{color:color}}>liked</span> <span className="notification__username"> your opinion on Farmer's protest</span> </p>
            <span className="notification__time">4 hours ago</span>
            <span className="notification__img" ><img  src="farmer.jpg"></img></span>
        </div>
    )
}

export default NotificationContent
