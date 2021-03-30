import React,{useState} from 'react'
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


export default function Poll({favour, against}) {

    const calculate = (val) => {
        console.log(val)
        if(val < 10) return val/10;
        else if(val < 100) return val/100;
        else if(val < 1000) return val/1000;
        else return 50;
    }  

    const [fav, setFav] = useState(typeof favour !== 'undefined' ? parseFloat((favour.length/(favour.length+against.length)).toFixed(2)) : 1 );
    const [ag, setAg] = useState(typeof against !== 'undefined' ? parseFloat((against.length/(favour.length+against.length)).toFixed(2)) : 1  );




      

    return (
        <div>
        <div className="poll"  >
         <Dislike text={`${fav*100}%`} flex={fav} like />
         <Dislike  background={"#ff0000"} text={`${ag*100}%`} flex={ag} />
        </div>
        {/* <div className="poll__votes" >
            <p>10,000 votes</p>
            <p>10,000 votes</p>
        </div> */}
        </div>
    )
}