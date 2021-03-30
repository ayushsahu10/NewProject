import React from 'react'
import './RecentComment.css'
import { Link } from "react-router-dom";



function RecentComment() {


    
    return (
        <div>
          <Link to={`/feed/1236`}>
            <div className="about__tab">
        <img src="farmer.jpg"></img>

        <div className="innerpara">
          <h2>2020–2021 Indian farmers' protest</h2>
          

          <p>
          Your Comment: I totally agree with farmer protest. count me in the protest
          </p>
        </div>
        
      </div>
      </Link>
        </div>
    )
}

export default RecentComment