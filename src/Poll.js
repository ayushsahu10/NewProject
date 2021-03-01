import React from 'react'
import './Poll.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const Dislike = ({background,text,flex,like}) => {
    return(
        <div className="poll__dislike" style={{width:"100px",backgroundColor:background,flex:flex}}  >
           { like ? <ThumbUpAltIcon /> :
          <ThumbDownIcon />}
           <p>{text}</p>
        </div>
    )
}


export default function Poll() {
    return (
        <div>
        <div className="poll"  >
         <Dislike text={"50%"} flex={0.79} like />
         <Dislike  background={"#ff0000"} text={"50%"} flex={0.29} />
        </div>
        <div className="poll__votes" >
            <p>10,000 votes</p>
            <p>10,000 votes</p>
        </div>
        </div>
    )
}