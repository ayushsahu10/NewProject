import React from 'react'
import './Feed.css';
import DescriptionIcon from '@material-ui/icons/Description';
import Cards from './Cards';

function Feed() {
    return (
        <div className="feed">
        <h2 className="newsfeed"> <DescriptionIcon /> Latest News</h2>
     
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        </div>
        
        
    )
}

export default Feed
