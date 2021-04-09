import React, { useEffect } from "react";
import "./Sidebar.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { NavLink } from "react-router-dom";
import Header from "./Header.js";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import LoginSidebar from './LoginSidebar'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/thewiseindia-8e9a9.appspot.com/o/hand.png?alt=media&token=9b3e03f4-ba46-4918-aec0-60f619b2b2e0"
          }
        />
        <p>WiseIndia</p>
      </div>

      <div className="sidebar__top">
        <img
          src={"https://material-ui.com/static/images/grid-list/camera.jpg"}
        />
        <div className="sidebar__topDetail">
          <p style={{ fontWeight: "bold", color: "#2c4c4b" }}>Ayush thakre</p>
          <p style={{ fontSize: "12px", color: "#c8d6d2" }}>@ayusht0606</p>
        </div>
      </div>

      <div className="sidebar__link">
        <NavLink
          to={"/feed"}
          activeClassName="sidebar__linkActive"
          className="sidebar__linkInActive"
        >
          <div className="link">
            <HomeIcon />
            <p> Home</p>
          </div>
        </NavLink>
        <NavLink
          to={"/search"}
          activeClassName="sidebar__linkActive"
          className="sidebar__linkInActive"
        >
          <div className="link">
            <SearchIcon /> <p>Search</p>
          </div>
        </NavLink>
        <NavLink
          to={"/notifications"}
          activeClassName="sidebar__linkActive"
          className="sidebar__linkInActive"
        >
          <div className="link">
            <NotificationsNoneIcon />
            <p>Notification</p>
          </div>
        </NavLink>
        <NavLink
          to={"/bookmarks"}
          activeClassName="sidebar__linkActive"
          className="sidebar__linkInActive"
        >
          <div className="link">
            <BookmarkBorderIcon />
            <p>Saved</p>
          </div>
        </NavLink>
        <NavLink
          to={"/about"}
          activeClassName="sidebar__linkActive"
          className="sidebar__linkInActive"
        >
          <div className="link">
            <PermIdentityIcon />
            <p>Profile</p>
          </div>
        </NavLink>
      </div>
      <div className="login__button__sidebar">
   <LoginSidebar /></div>
    </div>
  );
}
export default Sidebar;
