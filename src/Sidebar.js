import React,{useEffect} from "react";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { Link } from "react-router-dom";


function Sidebar() {

  return (
    <div className="sidebar">
      <AssessmentIcon className="icon" />

      <Link to={"/"}> <SidebarOptions active={false} Icon={<HomeIcon />} text="Home" /> </Link>
      <Link to={"/search"}><SidebarOptions Icon={<SearchIcon />} text="Search" /> </Link>
      <Link to={"/notifications"}><SidebarOptions Icon={<NotificationsNoneIcon />} text="Notification" /></Link>
      <Link to={"/bookmarks"}><SidebarOptions Icon={<BookmarkBorderIcon />} text="Bookmarks" /></Link>
      <Link to={"/about"}><SidebarOptions Icon={<PermIdentityIcon />} text="Profile" />
</Link>
    </div>
  );
}
export default Sidebar;
