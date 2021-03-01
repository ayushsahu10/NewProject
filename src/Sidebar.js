import React from 'react'
import './Sidebar.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import SidebarOptions from './SidebarOptions';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AssessmentIcon from '@material-ui/icons/Assessment';

function Sidebar() {
    return (
        <div className="sidebar">
    
        <AssessmentIcon className='icon' />
   
        <SidebarOptions active Icon={<HomeIcon/>} text="Home"/>
        
        <SidebarOptions Icon={<SearchIcon/>}  text="Search"/>
        <SidebarOptions Icon={<NotificationsNoneIcon/>} text="Notification" />
        
        <SidebarOptions Icon={<BookmarkBorderIcon/>} text="Bookmarks" />
        <SidebarOptions Icon={<PermIdentityIcon/>} text="Profile" />
       
        </div>
    )
}
export default Sidebar
