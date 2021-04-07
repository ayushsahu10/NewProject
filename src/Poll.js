import React,{useState} from 'react'
import './Poll.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

const Dislike = ({border,text,flex,like}) => {
    return(
        <div className="poll__dislike" style={{borderColor:border,alignItems:'center'}}  >
           { like ? <ThumbUpOutlinedIcon  style={{color:border,fontSize:'18px'}} /> :
          <ThumbDownAltOutlinedIcon style={{color:border,fontSize:'18px'}} />}
           <p style={{color:'#2c4c4b',marginLeft:'10px',fontWeight:'bold',fontSize:'15px'}} >{text}</p>
        </div>
    )
}



export default function Poll({favour, against}) {


    const [fav, setFav] = useState(typeof favour !== 'undefined' ? parseFloat((favour.length/(favour.length+against.length)).toFixed(2)) : 1 );
    const [ag, setAg] = useState(typeof against !== 'undefined' ? parseFloat((against.length/(favour.length+against.length)).toFixed(2)) : 1  );
    
    return (
        // <div>
        // <div className="poll"  >
        //  <Dislike text={`${fav*100}%`} flex={fav} like />
        //  <Dislike  background={"#e45e5f"} text={`${ag*100}%`} flex={ag} />
        // </div>
        // {/* <div className="poll__votes" >
        //     <p>10,000 votes</p>
        //     <p>10,000 votes</p>
        // </div> */}
        // </div>
        <div className='poll' >
            <div className='poll__section' 
            style={{flex:fav,
                borderTop:'1px solid #6ad593',
                borderBottom:'1px solid #6ad593',
                borderLeft:'1px solid #6ad593',
                borderTopLeftRadius:'10px',
                borderBottomLeftRadius:'10px',
                paddingRight:'0px'
            }}
             >
            <Dislike border={"#6ad593"} text={`${fav*100}%`}  like />
            <div className='poll__sectionPara'  style={{justifyContent:'flex-start', borderTop:'3px solid #6ad593',}} >
            <p>{favour.length} votes</p>
            </div>
            </div>

            <div className='poll__section' 
            style={{flex:ag,
                borderTop:'1px solid #fc0a28',
                borderBottom:'1px solid #fc0a28',
                borderRight:'1px solid #fc0a28',
                borderTopRightRadius:'10px',
                borderBottomRightRadius:'10px',
                paddingLeft:'0px',
            }} >
            <Dislike  border={"#e45e5f"} text={`${ag*100}%`} />
            <div className='poll__sectionPara' style={{borderTop:'3px solid #fc0a28'}} >
            <p >{against.length} votes</p>
            </div>
            </div>
        </div>
    )
}