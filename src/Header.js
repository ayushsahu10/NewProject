import React from 'react'
import './Header.css';


function Header({icon,text}) {
    return (
        <div className='header' >
        {icon}
            <p>{text}</p>
        </div>
    )
}

export default Header;
