import React from 'react'
import './RecentComment.css'
import Modal from '@material-ui/core/Modal';
import Poll from "./Poll";



function RecentComment() {


    
    return (
        <div>
            <div className="about__tab">
        <img src="farmer.jpg"></img>

        <div className="innerpara">
          <h2>2020–2021 Indian farmers' protest</h2>
          

          <p>
          You have voted for <span className="about__poll"> disagree </span> on this Poll.
          </p>
        </div>
        
      </div>
        </div>
    )
}

export default RecentComment
