import React, { useState } from "react";
import "./Cards.css";
import Poll from "./Poll";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ReportIcon from '@material-ui/icons/Report';
const DotMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
      style={{top:'50px',left:'-25px'}}
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Share  </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}><ListItemIcon>
            <SaveAltIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Save  </Typography></MenuItem>
        <MenuItem onClick={handleClose}><ListItemIcon>
            <ReportIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Report  </Typography></MenuItem>
      </Menu>
    </div>
  );
};

function Cards() {
  return (
    <div className="cards">
      <div className="mob__heading">
        <h2>#2020–2021 Indian farmers' protest</h2>
        <DotMenu />
      </div>

      <img src="farmer.jpg" className="img"></img>

      <div className="para">
        <div className="desktop__heading">
          <Link to={`/feed/1236`}>
            <h2>#2020–2021 Indian farmers' protest</h2>
          </Link>
         <DotMenu />
        </div>
        <Link to={`/feed/1236`}>
          <p>
            The farmers fear that the bills would render the current Minimum
            Support Price (MSP) procurement system ineffective and they would be
            forced to make distress sales to private companies. , leaving them
            at the mercy of “big farmers”
          </p>
        </Link>

        <Poll />
      </div>
    </div>
  );
}
export default Cards;
